const express = require('express');
const router = express.Router();
const axios = require('axios');
const { ytInitialData, searchData } = require('../helpers/parsing');

router.post('/', async (req, res, next) => {
    if (!req.body.query) {
        return res.status(400).send('No search term provided');
    }

    try {
        const response = await axios.get(`https://www.youtube.com/results?search_query=${req.body.query}`);
        res.json({
            videos: searchData(ytInitialData(response.data))
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;