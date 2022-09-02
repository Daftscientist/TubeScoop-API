const { default: axios } = require('axios');

exports.index =  function (request, response){
  axios.get(`https://www.youtube.com/results?search_query=${request.query.query}`).then((res) => {
    let data = res.data.split('var ytInitialData = ')[1].split(';</script>')[0].replace(';', '');
    data = JSON.parse(data);
    let videos = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
    let results = [];
    videos.forEach((video) => {
      if (video.videoRenderer) {
        results.push({
          id: video.videoRenderer.videoId,
          title: video.videoRenderer.title.runs[0].text,
          thumbnail: video.videoRenderer.thumbnail.thumbnails[video.videoRenderer.thumbnail.thumbnails.length - 1].url,
          duration: video.videoRenderer.lengthText.simpleText,
          views: video.videoRenderer.viewCountText.simpleText,
          channel: {
            name: video.videoRenderer.ownerText.runs[0].text,
            id: video.videoRenderer.ownerText.runs[0].navigationEndpoint.browseEndpoint.browseId,
            url: video.videoRenderer.ownerText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl,
            picture: video.videoRenderer.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails[0].url
          },
          url: video.videoRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url,
        });
      }
    });
    response.send(results);
  })
};
