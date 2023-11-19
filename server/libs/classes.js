// Classes made to standardize the data that is sent to the client

exports.ReducedChannel = class {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }
}

exports.ReducedVideo = class {
    constructor(title, thumbnail, url, channel, views, length, released_relatively, id) {
        this.title = title;
        this.thumbnail = thumbnail;
        this.url = url;
        this.channel = channel; // ReducedChannel{}
        this.views = views;
        this.length = length;
        this.released_relatively = released_relatively;
        this.id = id;        
    }
}

exports.FullChannel = class {
    constructor(name, subscribers, verified, url, profile_picture) {
        this.name = name;
        this.subscribers = subscribers;
        this.verified = verified;
        this.url = url;
        this.profile_picture = profile_picture;
    }
}

exports.FullVideo = class {
    constructor(title, views, thumbnail, likecount, release_date, released_relatively, description, channel) {
        this.title = title;
        this.views = views;
        this.thumbnail = thumbnail;
        this.likecount = likecount;
        this.release_date = release_date;
        this.released_relatively = released_relatively;
        this.description = description;
        this.channel = channel; // FullChannel{}
    }
}

exports.DepthChannel = class {
    constructor(name, subscribers, verified, url, profile_picture, videos) {
        this.name = name;
        this.subscribers = subscribers;
        this.verified = verified;
        this.url = url;
        this.profile_picture = profile_picture;
        this.videos = videos; // ReducedVideo[]
    }
}