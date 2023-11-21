// --- External Imports ---
const express = require('express');
const axios = require('axios');

// --- Internal Imports ---
const { ytInitialData, searchData, decideType } = require('../libs/parsing');

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


    try {
        const response = await axios.get(`https://www.youtube.com/results?search_query=${req.body.query}`);
        //console.log(whatIsIt(ytInitialData(response.data)))
        const data = ytInitialData(response.data);
        // loop through every item in 
        const base = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
        const videos = [];
        for (let i = 0; i < base.length; i++) {
            try {
                const type = decideType(base[i]);
                res.send("hi");
            }
            catch (e) {
                //Handle the error if you wish.
            }
            
        }
        //return videos
    } catch (err) {
        next(err);
    }
});

// --- Routes ---
module.exports = router;
