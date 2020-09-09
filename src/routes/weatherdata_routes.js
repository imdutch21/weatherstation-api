const express = require('express');
const router = express.Router();

const weatherdata_controller = require('../controllers/weatherdata_controller');

router.get('/weatherData', weatherdata_controller.getWeatherData);

module.exports = router;
