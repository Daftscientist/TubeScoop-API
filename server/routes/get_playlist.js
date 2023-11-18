const express = require('express');
const router = express.Router();
const axios = require('axios');
const { ytInitialData, searchData } = require('../helpers/parsing');

router.post('/', async (req, res, next) => {
    if (!req.body.search) {
        return res.status(400).send('No search term provided');
    }

    try {
        const response = await axios.get(`https://www.youtube.com/playlist?list=PLidqqIGKox7UVC-8WC9djoeBzwxPeXph7`);
        res.json(ytInitialData(response.data));
    } catch (err) {
        next(err);
    }
});

module.exports = router;