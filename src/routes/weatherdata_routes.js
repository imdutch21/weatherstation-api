const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authentication.controller');

const weatherdata_controller = require('../controllers/weatherdata_controller');

router.get('/weatherData', weatherdata_controller.getWeatherData);
router.all('/weatherData', AuthController.validateToken)
router.post('/weatherData', weatherdata_controller.addWeatherData);

module.exports = router;
