# YouTube Information Fetcher

This project is a Node.js application that uses the Express.js framework to create a simple YouTube information fetcher. 

## Features
- **API**: This project doesn't use YouTube's API, it instead "scrapes" the public web pages for the information.

## Routes

| Name  | Path | Body Content | Protocal | Response |
| ------------- | ------------- | ------------- |------------- |------------- |
| Search | `/search` | `query` | `POST` | [ReducedVideo[]](https://github.com/Daftscientist/youtube-fetcher/blob/main/server/libs/classes.js#L10-L21) | 
| Get Playlist Details | `/get_playlist` | `url` | `POST` | [Playlist](https://github.com/Daftscientist/youtube-fetcher/blob/main/server/libs/classes.js#L10-L21) |
| Get Video Details | `/get_video` | `url` | `POST` | [FullVideo](https://github.com/Daftscientist/youtube-fetcher/blob/main/server/libs/classes.js#L33-L44) |
| Get Channel Details | `/get_channel` | `url` (`/@[...]` or `/channel/[...]`) | `POST` | [DepthChannel](https://github.com/Daftscientist/youtube-fetcher/blob/main/server/libs/classes.js#L46C1-L64C2) |
| Get A Channel's Videos | `/get_channel_videos` | `url` (`/@[...]` or `/channel/[...]`) | `POST` | [ReducedVideo[]](https://github.com/Daftscientist/youtube-fetcher/blob/main/server/libs/classes.js#L10-L21) |

## Examples
Fetching information on a YouTube video:
```bash
curl -X POST http(s)://[your_domain]:[your_port]/get_video
   -H "Content-Type: application/json"
   -d '{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'  
```
Fetching information on a YouTube channel:
```bash
curl -X POST http(s)://[your_domain]:[your_port]/get_channel
   -H "Content-Type: application/json"
   -d '{"url": "https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw"}'  
```
Fetching a list of a channel's videos:
```bash
curl -X POST http(s)://[your_domain]:[your_port]/get_channel_videos
   -H "Content-Type: application/json"
   -d '{"url": "https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw"}'  
```
Fetching playlist information:
```bash
curl -X POST http(s)://[your_domain]:[your_port]/get_playlist
   -H "Content-Type: application/json"
   -d '{"url": "https://www.youtube.com/playlist?list=PLlaN88a7y2_qSLH3pLiQIQ6isY_DZTtdg"}'  
```
Searching YouTube:
```bash
curl -X POST http(s)://[your_domain]:[your_port]/search
   -H "Content-Type: application/json"
   -d '{"query": "What is the rickroll trend?"}'  
```

## Error Handling

The application includes error-handling middleware.

## Running the Server

The server listens on port 3000. To start the server, use the following command:

```bash
node main.js
```
You should see the message "Server is running on port 3000" in the console.

## Future Improvements

- Add more endpoints to fetch other types of data from YouTube.
- Improve error handling to provide more detailed error messages.
- Add tests to ensure the reliability of the application.
- ~~Standardise the response as small, large and regular video data.~~

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you want to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
