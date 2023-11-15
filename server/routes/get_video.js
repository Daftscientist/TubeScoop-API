const { default: axios } = require('axios');

const YOUTUBE_VIDEO = RegExp(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/img);

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function reform_url(id){
    // reforms the url using the id. (uniformly formats the url)
    return `https://www.youtube.com/watch?v=${id}`;
}

exports.index =  function (request, response){

    // if no video term was provided, return an error
    if (!request.body.video) {
        return response.status(400).send('No search term provided');
    }

    // if the video term is not a valid youtube url, if not return an error
    if (YOUTUBE_VIDEO.test(request.body.search === false)) {
        return response.status(400).send('Invalid youtube video url');
    }

    // if the video term is a valid youtube url, extract the video id and format the url
    const video_url = reform_url(youtube_parser(request.body.search))

    axios.get(video_url).then((res) => {
        const htmlContent = res.data;

        // REGEX to find the ytInitialData variable in a <script> tag
        const match = htmlContent.match(/var\s+ytInitialData\s*=\s*({[^;]+);/);

        // Check if there is a match and extract the value
        if (match && match[1]) {
            // Parse the JSON string to get the data object
            const base = JSON.parse(match[1])["contents"]["twoColumnWatchNextResults"]

            // Set data scraping paths
            const PRIMARY_DATA = base["results"]["results"]["contents"][0]["videoPrimaryInfoRenderer"]
            const SECONDARY_DATA = base["secondaryResults"]["secondaryResults"]["results"][0]
            const COMPACT_AREA_DATA = base["results"]["results"]["contents"][0]["videoPrimaryInfoRenderer"]
            const CREATOR_DATA = base["results"]["results"]["contents"][1]["videoSecondaryInfoRenderer"]["owner"]["videoOwnerRenderer"]

            // Video data scraping
            const title = PRIMARY_DATA["title"]["runs"][0]["text"]
            const views = PRIMARY_DATA["viewCount"]["videoViewCountRenderer"]["viewCount"]["simpleText"]
            const thumbnail = SECONDARY_DATA["compactVideoRenderer"]["thumbnail"]["thumbnails"][1]["url"]
            const likecount = COMPACT_AREA_DATA["videoActions"]["menuRenderer"]["topLevelButtons"][0]["segmentedLikeDislikeButtonRenderer"]["likeCount"]
            const release_data = COMPACT_AREA_DATA["dateText"]["simpleText"]
            const released_relatively = COMPACT_AREA_DATA["relativeDateText"]["simpleText"]
            const description = base["results"]["results"]["contents"][1]["videoSecondaryInfoRenderer"]["attributedDescription"]["content"]

            // Creator data scraping
            const creator_name = CREATOR_DATA["title"]["runs"][0]["text"]
            const creator_subscribers = CREATOR_DATA["subscriberCountText"]["simpleText"]
            const creator_url_formatted = `https://www.youtube.com${CREATOR_DATA["title"]["runs"][0]["navigationEndpoint"]["commandMetadata"]["webCommandMetadata"]["url"]}`
            const creator_profile_picture = CREATOR_DATA["thumbnail"]["thumbnails"][2]["url"]

            response.json({
                title: title,
                views: views,
                likecount: likecount,
                release_data: release_data,
                released_relatively: released_relatively,
                thumbnail_url: thumbnail,
                description: description,

                owner: {
                    name: creator_name,
                    subscribers: creator_subscribers,
                    url: creator_url_formatted,
                    profile_picture: creator_profile_picture
                }
            })

        } else {
            console.log('ytInitialData variable not found or not properly defined.');
        }

    }).catch((err) => {
        console.log(err);
    });
    
}