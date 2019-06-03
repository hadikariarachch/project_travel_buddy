const express = require('express');
const router = express.Router();
const weatherInfo = require('../controller/weatherInformation');

router.get('/:place', (req, res, next) => {
    const place = req.params.place;

    weatherInfo.Weather.getWeather(place, function (result) {
        res.status(200).json(JSON.parse(result));
    });
});

module.exports = router;