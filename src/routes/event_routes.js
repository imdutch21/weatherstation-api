const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authentication.controller');

const event_controller = require('../controllers/event_controller');

router.all('/:weatherStationID', AuthController.validateToken)
router.get('/:weatherStationID', event_controller.getEvents);
router.all('/', AuthController.validateToken)
router.post('/', event_controller.addEvent);

module.exports = router;
