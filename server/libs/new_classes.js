
exports.ReducedChannel = class {
    constructor(id, name, url, thumbnails) {
        this.type = 'reduced_channel'
        this.id = id,
        this.name = name;
        this.url = url;
        this.thumbnails = thumbnails;
    }
}

exports.ReducedPlaylist = class {
    constructor(id, title, url, thumbnails, video_count, channel) {
        this.type = 'reduced_playlist'
        this.id = id;
        this.title = title;
        this.url = url;
        this.thumbnails = thumbnails;
        this.video_count = video_count;
        this.channel = channel;
    }
}

exports.ReducedVideo = class {
    constructor(id, title, url, thumbnails, views, length, released_relatively, channel) {
        this.type = 'reduced_video'
        this.id = id;
        this.title = title;
        this.url = url;
        this.thumbnails = thumbnails;
        this.views = views;
        this.length = length;
        this.released_relatively = released_relatively;
        this.channel = channel;
    }
}
