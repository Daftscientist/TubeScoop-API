// --- External Packages ---
const express = require('express');

// --- Initializing ---
const app = express();

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
app.use('/search', require('./routes/search'));
app.use('/get_video', require('./routes/get_video'));
app.use('/get_playlist', require('./routes/get_playlist'));
app.use('/get_channel', require('./routes/get_channel'));
app.use('/get_channel_videos', require('./routes/get_channel_videos'));

// --- Error Handling ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// --- HTTP Server ---
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
