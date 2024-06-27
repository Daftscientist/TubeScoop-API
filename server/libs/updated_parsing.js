const { ReducedChannel, ReducedPlaylist, ReducedVideo } = require('./new_classes.js');

// This file is used to parse the data from the youtube api

const fs = require('fs');

const appendToTextFile = ( data) => {
  var stream = fs.createWriteStream('debug-logs.txt', {'flags': 'a'});
  stream.once('open', function(fd) {
    stream.write(data+"\r\n");
  });
}

const ytInitialData =  html => {
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


const ParseVideo = video => {
    const channel = new ReducedChannel(
        video.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.browseId,
        video.shortBylineText.runs[0].text,
        `https://www.youtube.com${video.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        video.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails
    )
    return new ReducedVideo(
        video.videoId,
        video.title.runs[0].text,
        `https://www.youtube.com${video.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        video.thumbnail.thumbnails,
        'viewcount',//video.viewCountText.simpleText,
        'length',//video.lengthText.simpleText,
        'publishedat',//video.publishedTimeText.simpleText,
        channel
    )
}

const ParsePlaylist = playlist => {
    
    return new ReducedPlaylist(
        playlist.playlistId,
        playlist.title.simpleText,
        `https://www.youtube.com${playlist.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        playlist.thumbnailRenderer.playlistVideoThumbnailRenderer.thumbnail.thumbnails,
        playlist.videoCount,
        //channel
    )
}

const ParseChannel = channel => {
    return new ReducedChannel(
        channel.channelId,
        channel.title.simpleText,
        `https://www.youtube.com${channel.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        channel.thumbnail.thumbnails
    )
}

const ParseShort = short => {
    return {"short would be here": "short"}
}

const ParseShelf = shelf => {
    // how to deal with a shelf?
    return {"shelf would be here": "shelf"}
}

const SearchCheck = (item) => {
    
    const type = Object.keys(item)[0];

    // use type check things

}


const handleContinuationRenderer = (item) => {
    const continuationToken = item.continuationItemRenderer.continuationEndpoint.continuationCommand.token;

    // use the token to get more data with axios
    console.log( continuationToken);

}

const handleItemSectionRenderer = (item, videos) => {
    item.itemSectionRenderer.contents.forEach(video => {
        const type = Object.keys(video)[0];
        if (type === 'videoRenderer') {
            videos.push(ParseVideo(video.videoRenderer));
        }
        else if (type === 'playlistRenderer') {
            videos.push(ParsePlaylist(video.playlistRenderer));
        }
        else if (type === 'channelRenderer') {
            videos.push(ParseChannel(video.channelRenderer));
        }
        else if (type === 'reelItemRenderer') {
            videos.push(ParseShort(video.reelItemRenderer));
        }
        else if (type === 'reelShelfRenderer') {
            videos.push(ParseShelf(video.reelShelfRenderer));
        }if (type === 'playlistRenderer') {
            videos.push(ParsePlaylist(video.playlistRenderer));
        }
        else if (type === 'channelRenderer') {
            videos.push(ParseChannel(video.channelRenderer));
        }
        else if (type === 'reelItemRenderer') {
            videos.push(ParseShort(video.reelItemRenderer));
        }
        else if (type === 'reelShelfRenderer') {
            videos.push(ParseShelf(video.reelShelfRenderer));
        }
    });
}

const parseSearch = (data, enable_suggestions, include_ads, enable_shorts) => {
    const items = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents;
    const videos = [];

    items.forEach(item => {
        const itemType = Object.keys(item)[0];

        if (itemType === 'itemSectionRenderer') {
            handleItemSectionRenderer(item, videos);
        }
        else if (itemType === 'continuationItemRenderer') {
            handleContinuationRenderer(item)
        }
        else if (itemType === 'searchPyvRenderer') {
            // handle this
            console.log("searchPyvRenderer")
        }
        else if (itemType === 'searchVerticalRenderer') {
            console.log("searchVerticalRenderer")
        }
        else if (itemType === 'searchRefinementCardRenderer') {
            console.log("searchRefinementCardRenderer")
        }
        else if (itemType === 'searchRefinementRenderer') {
            console.log("searchRefinementRenderer")
        }
        else if (itemType === 'searchSuggestionRenderer') {
            console.log("searchSuggestionRenderer")
        }
        else if (itemType === 'searchHistoryQueryRenderer') {
            console.log("searchHistoryQueryRenderer")
        }
        else if (itemType === 'searchHistorySuggestionRenderer') {
            console.log("searchHistorySuggestionRenderer")
        }
        else if (itemType === 'searchFilterGroupRenderer') {
            console.log("searchFilterGroupRenderer")
        }
        else if (itemType === 'searchMessageRenderer') {
            console.log("searchMessageRenderer")
        }
        else if (itemType === 'searchEmptyRenderer') {
            console.log("searchEmptyRenderer")
        }
        else if (itemType === 'searchSpellingSuggestionRenderer') {
            console.log("searchSpellingSuggestionRenderer")
        }
        else if (itemType === 'searchPivotRenderer') {
            console.log("searchPivotRenderer")
        }
        else if (itemType === 'searchSponsorRenderer') {
            console.log("searchSponsorRenderer")
        }
        else if (itemType === 'searchSponsorCarouselRenderer') {
            console.log("searchSponsorCarouselRenderer")
        }
        else if (itemType === 'searchSponsorVideoRenderer') {
            console.log("searchSponsorVideoRenderer")
        }
        else if (itemType === 'searchSponsorTextRenderer') {
            console.log("searchSponsorTextRenderer")
        }
        else if (itemType === 'searchSponsorshipRenderer') {
            console.log("searchSponsorshipRenderer")
        }
        else if (itemType === 'searchSponsorshipCarouselRenderer') {
            console.log("searchSponsorshipCarouselRenderer")
        }

    });

    return videos;
};

exports.ytInitialData = ytInitialData;
exports.parseSearch = parseSearch;