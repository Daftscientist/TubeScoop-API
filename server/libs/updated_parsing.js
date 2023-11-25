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
        video.viewCountText.simpleText,
        video.lengthText.simpleText,
        video.publishedTimeText.simpleText,
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
    return short
}

const ParseShelf = shelf => {
    // how to deal with a shelf?
    return {"shelf would be here": "shelf"}
}

const SearchCheck = (item) => {
    
    const type = Object.keys(item)[0];

    if (type === 'videoRenderer') {
        return ParseVideo(item.videoRenderer)
    }
    else if (type === 'playlistRenderer') {
        return ParsePlaylist(item.playlistRenderer)
    }
    else if (type === 'channelRenderer') {
        return ParseChannel(item.channelRenderer)
    }
    else if (type === 'reelShelfRenderer') {}
    else if (type === 'shelfRenderer') {}
    else {}
}


const parseSearch = (data, enable_suggestions, include_ads, enable_shorts) => {
    const items = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents;
    const videos = [];

    items.forEach(item => {
        const itemType = Object.keys(item)[0];

        if (itemType === 'adSlotRenderer') {
            console.log('ad: ', item);
        } else if (itemType === 'itemSectionRenderer') {
            const contents = item.itemSectionRenderer.contents;

            contents.forEach(content => {
                const contentType = Object.keys(content)[0];

                if (contentType === 'videoRenderer') {
                    videos.push('video :)');
                } else if (contentType === 'playlistRenderer') {
                    videos.push('playlist :)');
                } else if (contentType === 'channelRenderer') {
                    videos.push('channel :)');
                }
            });
        } else if (itemType === 'continuationItemRenderer') {
            // item.continuationItemRenderer.continuationEndpoint.continuationCommand.token
            // this gets the token for the next page of results
            // not sure how to implement  yet
        }
    });

    return videos;
}

exports.ytInitialData = ytInitialData;
exports.parseSearch = parseSearch;