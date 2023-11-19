// --- Internal Imports ---
const { ReducedChannel, ReducedVideo, FullChannel, FullVideo } = require('./classes');

// --- Local Functions --- 
const reform_url = id => `https://www.youtube.com/watch?v=${id}`;

exports.ytInitialData =  html => {
    // REGEX to isolate the variable ytInitialData from the html content.
    const match = html.match(/var\s+ytInitialData\s*=\s*({[^;]+);/);
    // Check if there is a match and extract the value
    if (match && match[1]) {
        try {
            return JSON.parse(match[1]);
        } catch (err) {
            console.log(err);
        }
    }
}

exports.channelData = data => {
    const base = data.contents
    return base
}

exports.playlistData = data => {
    const base = data.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;

    return base
    .filter(item => item.playlistVideoRenderer)
    .map(({ playlistVideoRenderer: video }) => {

        const channel = new ReducedChannel(video.shortBylineText.runs[0].text, `https://www.youtube.com${video.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`);

        video.title.runs[0].text,
        video.thumbnail.thumbnails[0].url,
        reform_url(video.videoId),
        channel,
        video.lengthText.simpleText,
        video.videoInfo.runs[2].text,
        video.videoId

        return new ReducedVideo(
            title=video.title.runs[0].text,
            thumbnail=video.thumbnail.thumbnails[0].url,
            url=reform_url(video.videoId),
            channel,
            views=video.videoInfo.runs[0].text,
            length=video.lengthText.simpleText,
            released_relatively=video.videoInfo.runs[2].text,
            id=video.videoId
        )
    })

}

exports.searchData = data => {
    const base = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
    return base
        .filter(item => item.videoRenderer)
        .map(({ videoRenderer: video }) => {
            let VIEWS = video.viewCountText.simpleText;
            if (video.viewCountText.runs && video.viewCountText.runs[1]) {
                VIEWS = video.viewCountText.runs[0].text;
            }

            const channel = new ReducedChannel(video.ownerText.runs[0].text, `https://www.youtube.com${video.ownerText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`);

            return new ReducedVideo(
                video.title.runs[0].text,
                video.thumbnail.thumbnails[0].url,
                reform_url(video.videoId),
                channel,
                VIEWS,
                video.lengthText.simpleText,
                video.publishedTimeText.simpleText,
                video.videoId
            );
        });
}

exports.videoData = data => {
    const base = data.contents.twoColumnWatchNextResults;
    const resultsContents = base.results.results.contents;
    const PRIMARY_DATA = resultsContents[0].videoPrimaryInfoRenderer;
    const SECONDARY_DATA = base.secondaryResults.secondaryResults.results[0];
    const CREATOR_DATA = resultsContents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer;

    const channel = new FullChannel(
        CREATOR_DATA.title.runs[0].text,
        CREATOR_DATA.subscriberCountText.simpleText,
        CREATOR_DATA.badges ? true : false,
        `https://www.youtube.com${CREATOR_DATA.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        CREATOR_DATA.thumbnail.thumbnails[2].url
    );

    return new FullVideo(
        PRIMARY_DATA.title.runs[0].text,
        PRIMARY_DATA.viewCount.videoViewCountRenderer.viewCount.simpleText,
        SECONDARY_DATA.compactVideoRenderer.thumbnail.thumbnails[1].url,
        PRIMARY_DATA.videoActions.menuRenderer.topLevelButtons[0].segmentedLikeDislikeButtonRenderer.likeCount,
        PRIMARY_DATA.dateText.simpleText,
        PRIMARY_DATA.relativeDateText.simpleText,
        resultsContents[1].videoSecondaryInfoRenderer.attributedDescription.content,
        channel
    );

}
