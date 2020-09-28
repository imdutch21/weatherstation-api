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
        let limit = request.query.Limit;
        let avg = request.query.AVG;
        let params = [];
        let statement = "SELECT * FROM `Data`"
        if (avg) {
            statement = "SELECT WeatherStationID, DataType, AVG(value) AS Average FROM `Data`"
        }

        let filter = "";
        if (dataType) {
            filter += " WHERE DataType = ?";
            params.push(dataType);
        }
        if (beforeDateTime) {
            if (params.length > 0) {
                filter += " AND TimeStamp < ?";
            } else {
                filter += " WHERE TimeStamp < ?";
            }
            params.push(beforeDateTime);
        }
        if (afterDateTime) {
            if (params.length > 0) {
                filter += " AND TimeStamp > ?";
            } else {
                filter += " WHERE TimeStamp > ?";
            }
            params.push(afterDateTime);
        }


        if (avg) {
            statement += filter;
            if (params.length > 0) {
                statement += " AND DataType <> 'WindDirection'";
            } else {
                statement += " WHERE DataType <> 'WindDirection'";
            }

            statement += " GROUP BY WeatherStationID, DataType"
            if (!dataType) {
                if (params.length > 0) {
                    statement += " UNION SELECT WeatherStationID, DataType, " +
                        "IF(DEGREES(ATAN2( -AVG(SIN(RADIANS(Value))) ,-AVG(COS(RADIANS(Value)))) ) < 180 ,DEGREES(ATAN2( -AVG(SIN(RADIANS(Value))) ,-AVG(COS(RADIANS(Value)))) ) + 180 ,DEGREES(ATAN2( -AVG(SIN(RADIANS(Value))) ,-AVG(COS(RADIANS(Value)))) ) - 180 ) AS Average" +
                        " FROM `Data`" + filter + " AND DataType = 'WindDirection'" + " GROUP BY WeatherStationID, DataType";
                    params = params.concat(params);
                } else {
                    statement += " UNION SELECT WeatherStationID, DataType, " +
                        "IF(DEGREES(ATAN2( -AVG(SIN(RADIANS(Value))) ,-AVG(COS(RADIANS(Value)))) ) < 180 ,DEGREES(ATAN2( -AVG(SIN(RADIANS(Value))) ,-AVG(COS(RADIANS(Value)))) ) + 180 ,DEGREES(ATAN2( -AVG(SIN(RADIANS(Value))) ,-AVG(COS(RADIANS(Value)))) ) - 180 ) AS Average" +
                        " FROM `Data` WHERE DataType = 'WindDirection'" + " GROUP BY WeatherStationID, DataType";
                }

            } else if (dataType === "WindDirection") {
                statement = "SELECT WeatherStationID, DataType, " +
                    "IF(DEGREES(ATAN2( -AVG(SIN(RADIANS(Value))) ,-AVG(COS(RADIANS(Value)))) ) < 180 ,DEGREES(ATAN2( -AVG(SIN(RADIANS(Value))) ,-AVG(COS(RADIANS(Value)))) ) + 180 ,DEGREES(ATAN2( -AVG(SIN(RADIANS(Value))) ,-AVG(COS(RADIANS(Value)))) ) - 180 ) AS Average" +
                    " FROM `Data`" + filter + " GROUP BY WeatherStationID, DataType";
            }
        } else {

            if (limit) {
                limit = parseInt(limit);
                if (limit > 0) {
                    filter += " ORDER BY ID DESC LIMIT ? ";
                    params.push(limit);
                }
            }
            statement += filter;
        }
        console.log(statement);

        db.query(statement, params, (error, results, fields) => {
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