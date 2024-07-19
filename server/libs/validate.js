
exports.validateChannelUrl = url => {
    const youtubeUrlRegex = /^https?:\/\/(?:www\.)?youtube\.com\/(?:@[\w-]+|channel\/[\w-]+)/;

    if (!youtubeUrlRegex.test(url)){
        return false;
    }
    return true;
}

exports.validatePlaylistUrl = url => {
    const youtubeUrlRegex = /^https?:\/\/(?:www\.)?youtube\.com\/playlist\?list=([\w-]+)/;

    if (!youtubeUrlRegex.test(url)){
        return false;
    }
    return true;
}

exports.validateVideoUrl = url => {
    const youtubeUrlRegex = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/;

    if (!youtubeUrlRegex.test(url)){
        return false;
    }
    return true;
}
