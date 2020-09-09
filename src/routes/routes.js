const express = require('express');
const ApiError = require('../models/ApiError');
const routes = express.Router();

//Route paths

const weatherdata_routes = require('./weatherdata_routes');

routes.use('/',weatherdata_routes);
// //Catch 404's 
// // Postprocessing; catch all non-existing endpoint requests
routes.use('*', function (req, res, next) {
    const error = new ApiError('Non-existing endpoint', 404);
    next(error);
});


module.exports = routes;