// Classes made to standardize the data that is sent to the client

exports.Playlist = class {
    constructor(title, thumbnail, url, creator, description, video_count, id, videos) {
        this.title = title;
        this.thumbnail = thumbnail;
        this.url = url;
        this.creator = creator; // ReducedChannel{}
        this.description = description;
        this.video_count = video_count;
        this.id = id;
        this.videos = videos; // ReducedVideo[]
    }
}

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
    constructor(name, description, keywords, subscribers, verified, artist, url, profile_picture, banner, tv_banner, sfw, availableIn, rss_feed, video_count, id) {
        this.name = name;
        this.description = description;
        this.keywords = keywords;
        this.subscribers = subscribers;
        this.verified = verified;
        this.artist = artist
        this.url = url;
        this.profile_picture = profile_picture;
        this.banner = banner;
        this.tv_banner = tv_banner;
        this.sfw = sfw;
        this.availableIn = availableIn;
        this.rss_feed = rss_feed;
        this.video_count = video_count;
        this.id = id;
    }
}