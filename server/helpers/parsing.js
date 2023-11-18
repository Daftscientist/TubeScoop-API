const reform_url = id => `https://www.youtube.com/watch?v=${id}`;

exports.ytInitialData = function (html) {
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

exports.playlistData = data => {
    const base = data.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;

    return base
    .filter(item => item.playlistVideoRenderer)
    .map(({ playlistVideoRenderer: video }) => {
        return {
            title: video.title.runs[0].text,
            thumbnail: video.thumbnail.thumbnails[0].url,
            url: reform_url(video.videoId),
            channel: video.shortBylineText.runs[0].text,
            length: video.lengthText.simpleText,
            views: video.videoInfo.runs[0].text,
            released_relatively: video.videoInfo.runs[2].text,
            channel: video.shortBylineText.runs[0].text,
            channel_url: `https://www.youtube.com${video.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        }
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

            return {
                title: video.title.runs[0].text,
                thumbnail: video.thumbnail.thumbnails[0].url,
                url: reform_url(video.videoId),
                channel: video.ownerText.runs[0].text,
                views: VIEWS,
                MORE_INFO: "POST https://silver-yodel-p9pqr6qq94jh6xr4-3000.app.github.dev/get_video"
            };
        });
}

exports.videoData = data => {
    const base = data.contents.twoColumnWatchNextResults;
    const resultsContents = base.results.results.contents;
    const PRIMARY_DATA = resultsContents[0].videoPrimaryInfoRenderer;
    const SECONDARY_DATA = base.secondaryResults.secondaryResults.results[0];
    const CREATOR_DATA = resultsContents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer;

    return {
        title: PRIMARY_DATA.title.runs[0].text,
        views: PRIMARY_DATA.viewCount.videoViewCountRenderer.viewCount.simpleText,
        thumbnail: SECONDARY_DATA.compactVideoRenderer.thumbnail.thumbnails[1].url,
        likecount: PRIMARY_DATA.videoActions.menuRenderer.topLevelButtons[0].segmentedLikeDislikeButtonRenderer.likeCount,
        release_date: PRIMARY_DATA.dateText.simpleText,
        released_relatively: PRIMARY_DATA.relativeDateText.simpleText,
        description: resultsContents[1].videoSecondaryInfoRenderer.attributedDescription.content,
        channel: {
            name: CREATOR_DATA.title.runs[0].text,
            subscribers: CREATOR_DATA.subscriberCountText.simpleText,
            verified: CREATOR_DATA.badges ? true : false,
            url: `https://www.youtube.com${CREATOR_DATA.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
            profile_picture: CREATOR_DATA.thumbnail.thumbnails[2].url
        }
    };
}