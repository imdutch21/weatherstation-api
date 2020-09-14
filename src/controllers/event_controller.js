const ApiError = require('../models/ApiError');
const Event = require('../models/Event');
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
    getEvents(request, response, next) {
        let WeatherStationID = request.params.weatherStationID;
        doesWeatherStationBelongToPerson(WeatherStationID, request.id).then((resolve) => {
            if (resolve == false)
                next(new ApiError("Not authorised to use this weatherstation", 412));
            else {
                let sql = "SELECT * FROM `Event` WHERE WeatherStationID =?"
                db.query(sql, [WeatherStationID], (error, results, fields) => {
                    if (error) {
                        next(new ApiError("Problem handling query", 500))
                    } else {
                        if(results.length >= 1){
                            let idsToDelete = [];
                            results.forEach(e =>{
                                idsToDelete.push(e.ID);
                            })
                            sql = "DELETE FROM `Event` WHERE ID in (?)"
                            db.query(sql, [idsToDelete], (e, r, f) => {
                                response.status(200).json(
                                    results
                                ).end();
                            });
                        } else{
                            response.status(200).json(
                                results
                            ).end();
                        }
                    }
                });
            }
        });
    },
    addEvent(request, response, next) {
        let event;
        try {
            event = new Event(request.body);
        } catch (e) {
            next(new ApiError(e.toString(), 412));
        }
        doesWeatherStationBelongToPerson(event.WeatherStationID, request.id).then((resolve) => {
            if (resolve == false)
                next(new ApiError("Not authorised to use this weatherstation", 412));
            else {
                let sql = "INSERT INTO `Event` (`Event`, `Parameter`, `WeatherStationID`) VALUES (?,?,?)"
                db.query(sql, [event.Event, event.Parameter, event.WeatherStationID], (error, results, fields) => {
                    if (error) {
                        next(new ApiError(error, 500))
                    } else {
                        event.ID = results.insertId;
                        response.status(200).json(
                            event
                        ).end();
                    }
                });
            }
        })

    }
}