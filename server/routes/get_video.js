// --- External Imports ---
const express = require('express');
const axios = require('axios');

// --- Internal Imports ---
const { ytInitialData, videoData } = require('../libs/parsing');

// --- Persistant Instances ---
const router = express.Router();

// --- Globals ---
const YOUTUBE_VIDEO = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
const reform_url = id => `https://www.youtube.com/watch?v=${id}`;

// --- Route ---
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

// --- Exports ---
module.exports = router;
