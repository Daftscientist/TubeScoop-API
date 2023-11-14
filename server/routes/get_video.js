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
    if (!request.body.search) {
        // if no search term was provided, return an error
        return response.status(400).send('No search term provided');
    }

    // if the search term is not a valid youtube url, return an error
    if (YOUTUBE_VIDEO.test(request.body.search === false)) {
        return response.status(400).send('Invalid youtube video url');
    }

    // if the search term is a valid youtube url, extract the video id
    const videoId = youtube_parser(request.body.search);

    const videoURL = reform_url(videoId);

    axios.get(videoURL).then((res) => {
        const htmlContent = res.data;

        // Define the regular expression to match the variable assignment
        const regex = /var\s+ytInitialData\s*=\s*({[^;]+);/;

        // Execute the regular expression on the HTML content
        const match = htmlContent.match(regex);

        // Check if there is a match and extract the value
        if (match && match[1]) {
            const ytInitialDataValue = JSON.parse(match[1]);
            const initValue = JSON.parse(ytInitialDataValue);
            //response.json(initValue)

            const init_value = ["contents"]["twoColumnWatchNextResults"]

            const title = initValue[0]["videoPrimaryInfoRenderer"]["title"]["runs"][0]["text"]
            const views = initValue["contents"]["twoColumnWatchNextResults"]["results"]["results"]["contents"][0]["videoPrimaryInfoRenderer"]["viewCount"]["videoViewCountRenderer"]["viewCount"]["simpleText"]
            const thumbnail = initValue["contents"]["twoColumnWatchNextResults"]["secondaryResults"]["secondaryResults"]["results"][0]["compactVideoRenderer"]["thumbnail"]["thumbnails"][1]["url"]

            const likecount = initValue["contents"]["twoColumnWatchNextResults"]["results"]["results"]["contents"][0]["videoPrimaryInfoRenderer"]["videoActions"]["menuRenderer"]["topLevelButtons"][0]["segmentedLikeDislikeButtonRenderer"]["likeCount"]
            const release_data = initValue["contents"]["twoColumnWatchNextResults"]["results"]["results"]["contents"][0]["videoPrimaryInfoRenderer"]["dateText"]["simpleText"]
            const released_relatively = initValue["contents"]["twoColumnWatchNextResults"]["results"]["results"]["contents"][0]["videoPrimaryInfoRenderer"]["relativeDateText"]["simpleText"]

            const video_description = initValue["contents"]["twoColumnWatchNextResults"]["results"]["results"]["contents"][1]["videoSecondaryInfoRenderer"]["attributedDescription"]["content"]

            const owner_info = initValue["contents"]["twoColumnWatchNextResults"]["results"]["results"]["contents"][1]["videoSecondaryInfoRenderer"]["owner"]["videoOwnerRenderer"]

            const owner_name = owner_info["title"]["runs"][0]["text"]
            const owner_subscribers = owner_info["subscriberCountText"]["simpleText"]
            const owner_url = owner_info["title"]["runs"][0]["navigationEndpoint"]["commandMetadata"]["webCommandMetadata"]["url"]
            const owner_url_formatted = `https://www.youtube.com${owner_url}`
            const owner_profile_picture = owner_info["thumbnail"]["thumbnails"][2]["url"]


            response.json({
                title: title,
                views: views,
                likecount: likecount,
                release_data: release_data,
                released_relatively: released_relatively,
                thumbnail_url: thumbnail,
                video_description: video_description,

                owner: {
                    name: owner_name,
                    subscribers: owner_subscribers,
                    url: owner_url_formatted,
                    profile_picture: owner_profile_picture
                }
            })

        } else {
            console.log('ytInitialData variable not found or not properly defined.');
        }

    }).catch((err) => {
        console.log(err);
    });
    
}