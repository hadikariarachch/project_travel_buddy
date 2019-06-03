const placeSummery = require('../controller/summeries.js');
const express = require('express');
const router = express.Router();

router.get('/:keyword', (req, res, next) => {
    const word = req.params.keyword;

    placeSummery.PlaceSummery.getDetails(word, function (result) {
        res.status(200).json(JSON.parse(result));
    });
});

module.exports = router;
