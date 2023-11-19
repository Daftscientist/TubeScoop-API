const express = require('express');
const router = express.Router();
const axios = require('axios');
const { ytInitialData, playlistData } = require('../libs/parsing');

router.post('/', async (req, res, next) => {
    if (!req.body.url) {
        return res.status(400).send('No search term provided');
    }

    var playlistmatch = req.body.url.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/);
    if (!playlistmatch){
        return res.status(400).send('Invalid youtube playlist url');
    }

    try {
        const response = await axios.get(req.body.url);
        res.json(playlistData(ytInitialData(response.data)));
    } catch (err) {
        next(err);
    }
});

module.exports = router;