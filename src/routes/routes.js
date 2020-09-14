const express = require('express');
const ApiError = require('../models/ApiError');
const router = express.Router();

//Route paths

const weatherdata_routes = require('./weatherdata_routes');
const weatherstation_routes = require('./weatherstation_routes');
const event_routes = require('./event_routes');
const authentication_routes = require('./authentication.routes');

router.use('/weatherData',weatherdata_routes);
router.use('/weatherStation',weatherstation_routes);
router.use('/event',event_routes);

router.use('/',authentication_routes);
// //Catch 404's 
// // Postprocessing; catch all non-existing endpoint requests
router.use('*', function (req, res, next) {
    const error = new ApiError('Non-existing endpoint', 404);
    next(error);
});


module.exports = router;