const ytdl = require("ytdl-core")
const fs = require("fs")

exports.index =  function (request, response){
    const video_url = decodeURI(request.query.video_url);
    const video = ytdl(video_url, {
        filter: function (format) {
            console.log(format.quality)
          return format.quality == "large";
        },
      }).pipe(fs.createWriteStream('video.mp4'));
    response.send("created video download");
    res.end();
}
// Language: javascript