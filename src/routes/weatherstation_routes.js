const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authentication.controller');

const weatherStation_controller = require('../controllers/weatherStation_controller');

router.get('/', weatherStation_controller.getWeatherStations);
router.get('/:weatherStationID', weatherStation_controller.getWeatherStation);
router.all('/', AuthController.validateToken)
router.post('/', weatherStation_controller.addWeatherStation);

module.exports = router;
