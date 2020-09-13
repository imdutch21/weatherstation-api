const ApiError = require('../models/ApiError');
const WeatherData = require('../models/WeatherData');
const db = require("../database/mysql.db");

function doesWeatherStationBelongToPerson(weatherStationID, StudentID) {
    return new Promise(resolve => {
        let sql = "SELECT * FROM `WeatherStation` WHERE ID = ? AND StudentID = ?"
        db.query(sql, [weatherStationID, StudentID], (error, results, fields) => {
            if (error) {
                resolve(false);
            } else {
                resolve(results.length == 1);
            }

        });
    })
}

module.exports = {
    getWeatherData(request, response, next) {
        let afterDateTime = request.query.afterDateTime;
        let beforeDateTime = request.query.beforeDateTime;
        let dataType = request.query.dataType;

        let sql = "SELECT * FROM `Data`"
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
    addWeatherData(request, response, next) {
        let weatherData;
        try {
            weatherData = new WeatherData(request.body);
        } catch (e) {
            next(new ApiError(e, 412));
        }
        doesWeatherStationBelongToPerson().then((resolve) => {
            if (resolve == false)
                next(new ApiError("Not authorised to use this weatherstation", 412));
            else {
                let sql = "SELECT * FROM `Data`"
                db.query(sql, (error, results, fields) => {
                    if (error) {
                        next(new ApiError("Problem handling query", 500))
                    } else {
                        response.status(200).json([
                            results
                        ]).end();
                    }
                });
            }
        })

    }
}