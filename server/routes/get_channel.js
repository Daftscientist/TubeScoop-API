// --- External Imports ---
const express = require('express');
const axios = require('axios');

// --- Internal Imports ---
const { ytInitialData, channelData } = require('../libs/parsing');

// --- Persistant Instances ---
const router = express.Router();

// --- Route ---
router.post('/', async (req, res, next) => {
    if (!req.body.url) {
        return res.status(400).send('No channel url provided');
    }

    // regex to identify if the url is in this format https://www.youtube.com/@ChannelName and https://www.youtube.com/channel/ChannelID
    
    const youtubeUrlRegex = /^https?:\/\/(?:www\.)?youtube\.com\/(?:@[\w-]+|channel\/[\w-]+)/;

    if (!youtubeUrlRegex.test(req.body.url)){
        return res.status(400).send('Invalid youtube channel url');
    }

    try {
        const response = await axios.get(req.body.url);
        return res.json(channelData(ytInitialData(response.data)));
    } catch (err) {
        next(err);
    }
});

// --- Exports ---
module.exports = router;
