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

    if (!req.body.url.match(`(?:(?:http|https):\/\/|)(?:www\.|)youtube\.com\/(channel|user)\/([A-Z][a-zA-Z0-9\-_]{1,})`)){
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
