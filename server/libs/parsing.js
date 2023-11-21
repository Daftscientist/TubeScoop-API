// --- Internal Imports ---
const { ReducedChannel, ReducedVideo, FullChannel, FullVideo, DepthChannel, Playlist } = require('./classes');

// --- Local Functions --- 
const reform_url = id => `https://www.youtube.com/watch?v=${id}`;

exports.ytInitialData =  html => {
    // REGEX to isolate the variable ytInitialData from the html content.
    const match = html.match(/var\s+ytInitialData\s*=\s*({[\s\S]*?});<\/script>/);
    // Check if there is a match and extract the value
    if (match && match[1]) {
        try {
            return JSON.parse(match[1]);
        } catch (err) {
            console.log(err); // Should not error
        }
    }
}

exports.channelVideos = data => {
    const base = data.contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer.content.richGridRenderer.contents;

    return base.filter(item => item.richItemRenderer)
    .map(({ richItemRenderer: video }) => {
        //video.content.videoRenderer.videoId;
        let channel = new ReducedChannel(
            name = data.metadata.channelMetadataRenderer.title,
            url = data.metadata.channelMetadataRenderer.channelUrl
        );

        return new ReducedVideo(
            title=video.content.videoRenderer.title.runs[0].text,
            thumbnail=video.content.videoRenderer.thumbnail.thumbnails[0].url,
            url=reform_url(video.content.videoRenderer.videoId),
            channel=channel,
            views=video.content.videoRenderer.viewCountText.simpleText,
            length=video.content.videoRenderer.lengthText.simpleText,
            released_relatively=video.content.videoRenderer.publishedTimeText.simpleText,
            id=video.content.videoRenderer.videoId
        )
    })
}

exports.channelData = data => {
    const metadata = data.metadata.channelMetadataRenderer;
    const header = data.header.c4TabbedHeaderRenderer;

    const isVerified = data1 => {
        if (data1.badges && data1.badges[0].metadataBadgeRenderer.tooltip === 'Verified' && data1.badges[0].metadataBadgeRenderer.style === 'BADGE_STYLE_TYPE_VERIFIED') {
            return true;
        }
        return false;
    };

    const isArtist = data1 => {
        if (data1.badges && data1.badges[0].metadataBadgeRenderer.tooltip === 'Official Artist Channel' && data1.badges[0].metadataBadgeRenderer.style === 'BADGE_STYLE_TYPE_VERIFIED_ARTIST') {
            return true;
        }
        return false;
    };

    return new DepthChannel(
        name=metadata.title,
        description=metadata.description,
        keywords=metadata.keywords,
        subscribers=header.subscriberCountText.simpleText,
        verified=isVerified(header),
        artist=isArtist(header),
        url=metadata.channelUrl,
        profile_picture=metadata.avatar.thumbnails[0].url,
        banner=header.banner.thumbnails[0].url,
        tv_banner=header.tvBanner.thumbnails[0].url,
        sfw=metadata.isFamilySafe,
        availableIn=metadata.availableCountryCodes,
        rss_feed=metadata.rssUrl,
        video_count=header.videosCountText.runs[0].text,
        id=metadata.externalId
    );
}

exports.playlistData = (data, videos) => {
    const header = data.header.playlistHeaderRenderer;


    return new Playlist(
        title=header.title.simpleText,
        thumbnail=header.playlistHeaderBanner.heroPlaylistThumbnailRenderer.thumbnail.thumbnails[0].url,
        url=`https://www.youtube.com/playlist?list=${header.playlistId}`,
        creator=new ReducedChannel(
            name=header.ownerText.runs[0].text,
            url=`https://www.youtube.com${header.ownerText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`
        ),
        description=header.descriptionText.simpleText,
        video_count=header.numVideosText.runs[0].text,
        id=header.playlistId,
        videos=videos
    );
}

exports.playlistVideos = data => {
    const base = data.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;
    return base
    .filter(item => item.playlistVideoRenderer)
    .map(({ playlistVideoRenderer: video }) => {

        const channel = new ReducedChannel(video.shortBylineText.runs[0].text, `https://www.youtube.com${video.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`);

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

exports.decideType = item => {
    const type = Object.keys(item)[0];
    console.log(type)
    // videoRenderer
    // playlistRenderer
    // reelShelfRenderer
}

exports.searchData = data => {
    //return data
    const base = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
    //return base
    return base
        .filter(item => item.videoRenderer)
        .map(({ videoRenderer: video }) => {
            return video
            if (video.badges?.[0]?.metadataBadgeRenderer.style === 'BADGE_STYLE_TYPE_LIVE_NOW') {
                // this is a live video
                console.log('live video')
            }


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
