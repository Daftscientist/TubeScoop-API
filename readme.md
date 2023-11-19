# YouTube Information Fetcher

This project is a Node.js application that uses the Express.js framework to create a simple YouTube information fetcher. 

## Features
- **API**: This project doesn't use YouTube's API, it instead "scrapes" the public web pages for the information.

## Routes

- **Search**: The `/search` endpoint accepts a `POST` request with a query in the request body and returns a list of videos that match the search term and their corresponding information.

- **Get Playlist Details**: The `/get_playlist` endpoint accepts a `POST` request with a YouTube playlist URL in the request body. It returns detailed information about the specified playlist and information on each video.

- **Get Video Details**: The `/get_video` endpoint also accepts a `POST` request with a YouTube video URL in the request body. It returns detailed information about the specified video.

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
