
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
    return video
}

const ParsePlaylist = playlist => {
    return playlist
}

const ParseChannel = channel => {
    return channel
}

const ParseShort = short => {
    return short
}

const ParseShelf = shelf => {
    if (shelf.title.simpleText === "Shorts") {
        return shelf
    }
    else if (shelf.title.simpleText === "Channels new to you") {
        // loop through this shelf.content.verticalListRenderer.items

        videos_in_shelf = ["Title = Channels new to you"]
        for (let i = 0; i < shelf.content.verticalListRenderer.items.length; i++) {
            if (shelf.content.verticalListRenderer.items[i].videoRenderer) {
                videos_in_shelf.push(ParseChannel(shelf.content.verticalListRenderer.items[i].videoRenderer))
            }
        }
        return videos_in_shelf
    }
    else {
        return shelf
    }
}

const SearchCheck = item => {
    const type = Object.keys(item)[0];
    if (type === 'reelShelfRenderer') {
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
        return ParseShort(item.reelItemRenderer)
    }
    else if (type === 'shelfRenderer') {
        return ParseShelf(item.shelfRenderer)
    }
    else {
        return item
    }
}


const parseSearch = data => {
    const base = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
    const videos = [];
    for (let i = 0; i < base.length; i++) {
        try {
            const result = SearchCheck(base[i]);
            videos.push(result)
        } catch (e) {
            // Handle the error if you wish. nah
        }
    }
    return videos;
}

exports.ytInitialData = ytInitialData;
exports.parseSearch = parseSearch;