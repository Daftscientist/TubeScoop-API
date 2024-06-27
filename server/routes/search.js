// --- External Imports ---
const express = require('express');
const axios = require('axios');

// --- Internal Imports ---
//const { ytInitialData, searchData, decideType } = require('../libs/parsing');
const { ytInitialData, parseSearch } = require('../libs/updated_parsing');


// --- Persistant Instances ---
const router = express.Router();

// --- Variables ---
const filters = {
    minimum_likes: 0,
    minimum_views: 0,
    minimum_length: 0,
}

// --- Routes ---
router.post('/', async (req, res, next) => {
    if (!req.body.query) {
        return res.status(400).send('No search term provided');
    }
    if (!req.body.include_suggestions) {
        req.body.include_suggestions = false;
    }
    if (!req.body.include_ads) {
        req.body.include_ads = false;
    }
    if (!req.body.include_shorts) {
        req.body.include_shorts = false;
    }

    try {
        const response = await axios.get(`https://www.youtube.com/results?search_query=${req.body.query}`);
        //console.log(whatIsIt(ytInitialData(response.data)))
        const data = ytInitialData(response.data);
        // loop through every item in 
        // this is for video search
        const videos = parseSearch(data, req.body.include_suggestions, req.body.include_ads, req.body.include_shorts);
        res.json( videos)
    } catch (err) {
        next(err);
    }
});

// --- Routes ---
module.exports = router;
