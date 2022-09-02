import requests
import json

"""
Yes I know this is in python, this was just a little test to see if i could scrape the data without using its api easily
"""

def search_youtube(search_term: str) -> list:
    data = requests.get("https://www.youtube.com/results?search_query={}".format(search_term)).text
    data = data.split("var ytInitialData = ")[1]
    data = data.split("</script>")[0]
    data = data.replace(";", "")
    data = json.loads(data)
    data = data['contents']['twoColumnSearchResultsRenderer']['primaryContents']['sectionListRenderer']['contents']
    search_results = []
    for item in data:
        if "itemSectionRenderer" in item:
            item = item['itemSectionRenderer']['contents']
        else:
            pass
        for item in item:
            if "playlistRenderer" in item:
                pass
            elif "shelfRenderer" in item:
                pass
            elif "itemSectionRenderer" in item:
                pass
            else:
                try:
                    try:
                        item = item['videoRenderer']
                    except TypeError:
                        break
                    thumbnail_url = item['thumbnail']['thumbnails'][0]['url']
                    video_title = item['title']['runs'][0]['text']
                    video_id = item['videoId']
                    video_url = "https://www.youtube.com/watch?v={}".format(video_id)
                    search_results.append(
                        {
                            "thumbnail_url": thumbnail_url.replace('"', "'"), 
                            "video_title": video_title.replace('"', "'"), 
                            "video_id": video_id.replace('"', "'"), 
                            "video_url": video_url
                        }
                    )
                except KeyError:
                    pass
    return search_results

print(search_youtube("sausage rolls")[0])