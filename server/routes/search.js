// --- External Imports ---
const express = require('express');
const axios = require('axios');

// --- Internal Imports ---
//const { ytInitialData, searchData, decideType } = require('../libs/parsing');
const { ytInitialData, parseSearch } = require('../libs/updated_parsing');

// --- Persistant Instances ---
const router = express.Router();

// --- Variables ---
const search_filters = {
    "UPLOAD_DATE": {
        "options": [
            "Last hour",
            "Today",
            "This week",
            "This month",
            "This year"
        ],
        "selected_option": null
    },
    "TYPE": {
        "options": [
            "Video",
            "Channel",
            "Playlist",
            "Film"
        ],
        "selected_option": null
    },
    "DURATION": {
        "options": [
            "Under 4 minutes",
            "4–20 minutes",
            "Over 20 minutes"
        ],
        "selected_option": null
    },
    "FEATURES": {
        "options": [
            "Live",
            "4K",
            "HD",
            "Subtitles/CC",
            "Creative Commons",
            "360°",
            "VR180",
            "3D",
            "HDR",
            "Location",
            "Purchased"
        ],
        "selected_options": []
    },
    "SORT_BY": {
        "options": [
            "Relevance",
            "Upload date",
            "View count",
            "Rating"
        ],
        "selected_option": null
    }
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
