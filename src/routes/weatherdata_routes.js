const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authentication.controller');

const weatherdata_controller = require('../controllers/weatherdata_controller');

router.get('/', weatherdata_controller.getWeatherData);
router.all('/', AuthController.validateToken)
router.post('/', weatherdata_controller.addWeatherData);

module.exports = router;
