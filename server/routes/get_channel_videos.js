// --- External Imports ---
const express = require('express');
const axios = require('axios');

// --- Internal Imports ---
const { ytInitialData, channelVideos } = require('../libs/parsing');
const { validateChannelUrl } = require('../libs/validate');

// --- Persistant Instances ---
const router = express.Router();

// --- Route ---
router.post('/', async (req, res, next) => {
    if (!req.body.url) {
        return res.status(400).send('No channel url provided');
    }
    
    if (!validateChannelUrl(req.body.url)) {
        return res.status(400).send('Invalid channel url');
    }

    try {
        const response = await axios.get(req.body.url + '/videos');
        return res.json(channelVideos(ytInitialData(response.data)));
    } catch (err) {
        next(err);
    }
});

// --- Exports ---
module.exports = router;
