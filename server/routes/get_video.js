const express = require('express');
const router = express.Router();
const axios = require('axios');
const { ytInitialData, videoData } = require('../libs/parsing');

const YOUTUBE_VIDEO = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

const reform_url = id => `https://www.youtube.com/watch?v=${id}`;

router.post('/', async (req, res, next) => {
    if (!req.body.url) {
        return res.status(400).send('No search term provided');
    }

    const match = YOUTUBE_VIDEO.exec(req.body.url);
    if (!match || match[2].length !== 11) {
        return res.status(400).send('Invalid youtube video url');
    }

    try {
        const response = await axios.get(reform_url(match[2]));
        res.json(videoData(ytInitialData(response.data)));
    } catch (err) {
        next(err);
    }
});

module.exports = router;