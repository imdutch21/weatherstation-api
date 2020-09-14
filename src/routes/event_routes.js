const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authentication.controller');

const event_controller = require('../controllers/event_controller');

router.all('/event/:weatherStationID', AuthController.validateToken)
router.get('/event/:weatherStationID', event_controller.getEvents);
router.all('/event', AuthController.validateToken)
router.post('/event', event_controller.addEvent);

module.exports = router;
