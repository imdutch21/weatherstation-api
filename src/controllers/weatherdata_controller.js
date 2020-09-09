const ApiError = require('../models/ApiError');
const WeatherData = require('../models/WeatherData');

module.exports = {
    getWeatherData(request, response, next){
        let afterDateTime = request.query.afterDateTime;
        let beforeDateTime = request.query.beforeDateTime;
        let dataType = request.query.dataType;


        response.status(200).json([
            new WeatherData(0, "Humidity", 0.8, new Date(), 0),
            new WeatherData(0, "WindSpeed", 5, new Date(), 0),
            new WeatherData(0, "WindDirection", 300, new Date(), 0)
        ]).end();
    },
    addWeatherData(request, response, next){
        let afterDateTime = request.query.afterDateTime;
        let beforeDateTime = request.query.beforeDateTime;
        let dataType = request.query.dataType;


        response.status(200).json([
            new WeatherData(0, "Humidity", 0.8, new Date(), 0),
            new WeatherData(0, "WindSpeed", 5, new Date(), 0),
            new WeatherData(0, "WindDirection", 300, new Date(), 0)
        ]).end();
    }
}