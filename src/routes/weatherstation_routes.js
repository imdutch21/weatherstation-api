const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authentication.controller');

const weatherStation_controller = require('../controllers/weatherStation_controller');

router.get('/weatherStation', weatherStation_controller.getWeatherStations);
router.get('/weatherStation/:weatherStationID', weatherStation_controller.getWeatherStation);
router.all('/weatherStation', AuthController.validateToken)
router.post('/weatherStation', weatherStation_controller.addWeatherStation);

module.exports = router;
