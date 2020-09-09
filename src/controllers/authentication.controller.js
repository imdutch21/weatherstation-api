const auth = require("../helper/authentication");
const assert = require("assert");
const ApiError = require('../model/ApiError')

module.exports = {
    validateToken(req, res, next) {
        console.log("validating token");

        try {
            assert(req.header, "header is not defined");
            assert(req.header("access-key"), "access-key has to be provided");
        } catch (error) {
            next(new ApiError(error.message, 412));
            return;
        }
        let token = req.header("access-key") || '';
        auth.decodeToken(token, (err, payload) => {
            if (err) {
                const error = new ApiError(err.message || err, 401);
                next(error);
            } else {
                const session = neo.session();
                next();
                // console.log("Authenticated payload = " + payload.username);
                // const query = `MATCH (p:Profile) WHERE ID(p) = ${payload.sub} RETURN ID(p) AS id`;
                // session.run(query, {})
                //     .then((result) => {
                //         if (result.records.length === 0) {
                //             next(new ApiError("This user does not exist anymore", 401));
                //         } else {
                //             console.log("Authenticated payload = " + payload.sub);
                //             req.id = result.records[0]._fields[0].low;
                //             next();
                //         }
                //     })
                //     .catch((error) => {
                //         session.close();
                //         next(new ApiError(error.message + " r37 auth", 500));
                //     });
            }
        });
    },
    getIsTokenVallid(req, res, next) { //Allows the user to check if the current token is vallid, isTokenVallid gets called before this
        res.status(200).end();
    },

    login(req, res, next) {
        let body = req.body || '';
        try {
            console.log(body.email);
            assert(typeof (body), "Request must have a body");
            assert(body.studentCode, "Request must have an studentCode");
            assert(body.password, "Request must have a password");
            body.password = auth.hash(body.password);
        } catch (ex) {
            next(new ApiError(ex.toString(), 412));
            return;
        }
        res.status(200).json({
            "key": auth.encodeToken(body.studentCode, body.password)
        }).end();
        // const session = neo.session();
        // const query = `MATCH (p:Profile {email: '${body.email}', password: '${body.password}'}) RETURN ID(p) AS id`;
        // session.run(query, {})
        //     .then((result) => {
        //         if (result.records.length === 0) {
        //             next(new ApiError("Password or email is incorrect", 401));
        //         } else {
        //             res.status(200).json({
        //                 "token": auth.encodeToken(result.records[0]._fields[0].low),
        //                 "id": result.records[0]._fields[0].low
        //             }).end();
        //         }
        //     }).catch((error) => {
        //         session.close();
        //         next(new ApiError(error.message, 500));
        //     });
    }
};