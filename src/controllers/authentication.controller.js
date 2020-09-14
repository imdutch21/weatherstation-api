const auth = require("../helper/authentication");
const assert = require("assert");
const ApiError = require('../models/ApiError')
const db = require("../database/mysql.db");

module.exports = {
    validateToken(req, res, next) {
        console.log("validating token");

        try {
            assert(req.header, "header is not defined");
            assert(req.header("access-key"), "access-key has to be provided");
        } catch (error) {
            next(new ApiError(error.toString(), 412));
            return;
        }
        let token = req.header("access-key") || '';
        auth.decodeToken(token, (err, payload) => {
            if (err) {
                const error = new ApiError(err.message || err, 401);
                next(error);
            } else {

                let sql = "SELECT ID FROM Student WHERE ID = ?"
                db.query(sql, [payload.StudentID], (error, results, fields) => {
                    if (results.length === 0) {
                        next(new ApiError("This user does not exist anymore", 401));
                    } else {
                        req.id = results[0].ID;
                        next();
                    }
                });
            }
        });
    },
    getIsTokenVallid(req, res, next) { //Allows the user to check if the current token is vallid, isTokenVallid gets called before this
        res.status(200).end();
    },
    register(req, res, next) {
        console.log("Register");

        let body = req.body || '';
        try {
            assert(body.StudentCode, "Request must have an studentCode");
            assert(body.Password, "Request must have a password");
            body.Password = auth.hash(body.Password);
        } catch (ex) {
            next(new ApiError(ex.toString(), 412));
            return;
        }
        let sql = "INSERT INTO Student (`StudentCode`, `Password`) VALUES (?, ?)"
        db.query(sql, [body.StudentCode, body.Password], (error, results, fields) => {
            if (error) {
                if (error.code === "ER_DUP_ENTRY")
                    next(new ApiError("studentcode is already registered", 412));
                else
                    next(new ApiError(error, 500))
            } else {
                res.status(200).json({
                    "Key": auth.encodeToken(results[0].ID, body.Password),
                    "StudentID": results[0].ID
                }).end();
            }
        });
    },
    login(req, res, next) {
        let body = req.body || '';
        try {
            assert(typeof (body), "Request must have a body");
            assert(body.StudentCode, "Request must have an studentCode");
            assert(body.Password, "Request must have a password");
            body.Password = auth.hash(body.Password);
        } catch (ex) {
            next(new ApiError(ex.toString(), 412));
            return;
        }

        let sql = "SELECT ID FROM Student WHERE StudentCode = ? AND Password = ?"
        db.query(sql, [body.StudentCode, body.Password], (error, results, fields) => {
            if (results.length === 0) {
                next(new ApiError("Wrong studentcode or password", 401));
            } else {
                console.log(results[0].ID);
                res.status(200).json({
                    "Key": auth.encodeToken(results[0].ID, body.Password),
                    "StudentID": results[0].ID
                }).end();
            }
        });
    }
};