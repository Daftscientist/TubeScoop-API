const YOUTUBE_VIDEO = RegExp(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/img);


console.log(YOUTUBE_VIDEO.test("https://www.youtube.com/watch?v=9bZkp7q19f0")[1])