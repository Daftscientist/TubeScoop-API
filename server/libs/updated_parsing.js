
// This file is used to parse the data from the youtube api

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
    return {
        title: video.title.runs[0].text,
        thumbnail: video.thumbnail.thumbnails[0].url,
        url: `https://www.youtube.com/watch?v=${video.videoId}`,
        channel: {
            name: video.ownerText.runs[0].text,
            url: `https://www.youtube.com${video.ownerText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        },
        views: video.viewCountText.simpleText,
        length: video.lengthText.simpleText,
        released_relatively: video.publishedTimeText.simpleText,
        id: video.videoId
    
    }
}

const ParsePlaylist = playlist => {
    return {
        title: playlist.title.simpleText,
        thumbnail: playlist.thumbnail.thumbnails[0].url,
        url: `https://www.youtube.com${playlist.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        channel: {
            name: playlist.shortBylineText.runs[0].text,
            url: `https://www.youtube.com${playlist.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        },
        video_count: playlist.videoCount,
        id: playlist.playlistId
    
    }
}

const ParseChannel = channel => {
    return {}
}

const ParseShort = short => {
    return short
}

const ParseShelf = shelf => {
    if (Object.keys(shelf.content.verticalListRenderer.items)[0] === "videoRenderer") {
        videos_in_shelf = ["shelf"]
        for (let i = 0; i < shelf.content.verticalListRenderer.items.length; i++) {
            if (shelf.content.verticalListRenderer.items[i].videoRenderer) {
                videos_in_shelf.push(ParseVideo(shelf.content.verticalListRenderer.items[i].videoRenderer))
            }
        }
    }
    else if (shelf.title.simpleText === "Shorts") {
        return shelf
    }
    else {
        return shelf
    }
}

const SearchCheck = (item, enable_suggestions) => {
    const type = Object.keys(item)[0];
    if (type === 'reelShelfRenderer') {
        if (!enable_suggestions) {
            // !!!!!!!!!!!!!!! MAKE A Different check for shorts !!!!!!!!!!!!!!
            return null//ParseShelf(item.reelShelfRenderer)
        }
        return ParseShelf(item.reelShelfRenderer)
    }
    else if (type === 'videoRenderer') {
        return ParseVideo(item.videoRenderer)
    }
    else if (type === 'playlistRenderer') {
        return ParsePlaylist(item.playlistRenderer)
    }
    else if (type === 'channelRenderer') {
        return ParseChannel(item.channelRenderer)
    }
    else if (type === 'reelItemRenderer') {
        if (!enable_suggestions) {
            // !!!!!!!!!!!!!!! MAKE A Different check for shorts !!!!!!!!!!!!!!
            return null//ParseShelf(item.reelShelfRenderer)
        }
        return ParseShort(item.reelItemRenderer)
    }
    else if (type === 'shelfRenderer') {
        if (!enable_suggestions) {
            // !!!!!!!!!!!!!!! MAKE A Different check for shorts !!!!!!!!!!!!!!
            return null//ParseShelf(item.reelShelfRenderer)
        }
        return ParseShelf(item.shelfRenderer)
    }
    else if (type === 'adSlotRenderer') {
        return null
        // Add option to enable ads
    }
    else {
        return item
    }
}


const parseSearch = (data, enable_suggestions) => {
    const base = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
    const videos = [];
    for (let i = 0; i < base.length; i++) {
        try {
            const result = SearchCheck(base[i], enable_suggestions);
            videos.push(result)
        } catch (e) {
            // Handle the error if you wish. nah
        }
    }
    return videos;
}

exports.ytInitialData = ytInitialData;
exports.parseSearch = parseSearch;