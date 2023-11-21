// --- External Imports ---
const express = require('express');
const axios = require('axios');

// --- Internal Imports ---
const { ytInitialData, searchData } = require('../libs/parsing');

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
        res.json(
            searchData(ytInitialData(response.data))
        );
    } catch (err) {
        next(err);
    }
});

// --- Routes ---
module.exports = router;
