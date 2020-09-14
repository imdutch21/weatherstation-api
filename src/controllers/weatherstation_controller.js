const ApiError = require('../models/ApiError');
const WeatherStation = require('../models/WeatherStation');
const db = require("../database/mysql.db");


module.exports = {
    getWeatherStations(request, response, next) {
        let sql = "SELECT * FROM `WeatherStation`"
        db.query(sql, (error, results, fields) => {
            if (error) {
                next(new ApiError("Problem handling query", 500))
            } else {
                response.status(200).json(
                    results
                ).end();
            }
        });
    },
    getWeatherStation(request, response, next) {
        let weatherStationID = request.params.weatherStationID;
        let sql = "SELECT * FROM `WeatherStation` WHERE ID = ?"
        db.query(sql, [weatherStationID], (error, results, fields) => {
            if (error) {
                next(new ApiError("Problem handling query", 500))
            } else {
                if (results.length > 0)
                    response.status(200).json(
                        results
                    ).end();
                else
                    next(new ApiError("Can't find Weatherstation with ID: " + id, 404));
            }
        });
    },
    addWeatherStation(request, response, next) {
        let id = request.id;
        console.log(id);
        let weatherStation;
        try {
            weatherStation = new WeatherStation(request.body);
        } catch (e) {
            next(new ApiError(e.toString(), 412));
            return;
        }
        let sql = "INSERT INTO `WeatherStation` (`Latitude`, `Longitude`, `StationName`, `StudentID`) VALUES (?, ?, ?, ?)"
        db.query(sql, [weatherStation.Latitude, weatherStation.Longitude, weatherStation.StationName, id], (error, results, fields) => {
            if (error) {
                next(new ApiError("Problem handling query", 500))
            } else {
                weatherStation.ID = results.insertId;
                response.status(200).json(
                    weatherStation
                ).end();
            }
        });
    }
}