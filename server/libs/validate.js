
exports.validateChannelUrl = url => {
    const youtubeUrlRegex = /^https?:\/\/(?:www\.)?youtube\.com\/(?:@[\w-]+|channel\/[\w-]+)/;

    if (!youtubeUrlRegex.test(url)){
        return false;
    }
    return true;
}