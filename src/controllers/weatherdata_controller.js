const ApiError = require('../models/ApiError');
const WeatherData = require('../models/WeatherData');
const db = require("../database/mysql.db");

function doesWeatherStationBelongToPerson(WeatherStationID, StudentID) {
    return new Promise(resolve => {
        let sql = "SELECT * FROM `WeatherStation` WHERE ID = ? AND StudentID = ?"
        db.query(sql, [WeatherStationID, StudentID], (error, results, fields) => {
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
        let afterDateTime = request.query.AfterDateTime;
        let beforeDateTime = request.query.BeforeDateTime;
        let dataType = request.query.DataType;
        let params = [];
        let sql = "SELECT * FROM `Data`"
        if (dataType) {
            sql += " WHERE DataType = ?";
            params.push(dataType);
        }
        if (beforeDateTime) {
            if (params.length > 0) {
                sql += " AND TimeStamp < ?";
            } else {
                sql += " WHERE TimeStamp < ?";
            }
            params.push(beforeDateTime);
        }
        if (afterDateTime) {
            if (params.length > 0) {
                sql += " AND TimeStamp > ?";
            } else {
                sql += " WHERE TimeStamp > ?";
            }
            params.push(afterDateTime);
        }

        db.query(sql, params, (error, results, fields) => {
            if (error) {
                next(new ApiError(error, 500))
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
            next(new ApiError(e.toString(), 412));
        }
        doesWeatherStationBelongToPerson(weatherData.WeatherStationID, request.id).then((resolve) => {
            if (resolve == false)
                next(new ApiError("Not authorised to use this weatherstation", 412));
            else {
                let sql = "INSERT INTO `Data` (`DataType`, `Value`, `Timestamp`, `WeatherStationID`) VALUES (?,?,?,?)"
                db.query(sql, [weatherData.DataType, weatherData.Value, weatherData.Timestamp, weatherData.WeatherStationID], (error, results, fields) => {
                    if (error) {
                        next(new ApiError(error, 500))
                    } else {
                        weatherData.ID = results.insertId
                        response.status(200).json(
                            weatherData
                        ).end();
                    }
                });
            }
        })

    }
}