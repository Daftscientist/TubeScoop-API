// make a basic express app with a post route

const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.post('/get_video', require('./routes/get_video.js').index);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});