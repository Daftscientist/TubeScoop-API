# YouTube Video Information Fetcher

This project is a Node.js application that uses the Express.js framework to create a simple YouTube video information fetcher. 

## Features

- **Search**: The `/search` endpoint accepts a POST request with a query in the request body and returns a list of videos that match the search term, including their titles, thumbnails, URLs, channels, and view counts.

- **Get Playlist Details**: The `/get_playlist` endpoint accepts a POST request with a YouTube playlist URL in the request body. It returns detailed information about the specified playlist, including the videos in the playlist.

- **Get Video Details**: The `/get_video` endpoint also accepts a POST request with a YouTube video URL in the request body. It returns detailed information about the specified video, including its title, view count, thumbnail, like count, release date, relative release date, description, and channel information (name, subscriber count, verification status, URL, and profile picture).

## Error Handling

The application includes error handling middleware.

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

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
