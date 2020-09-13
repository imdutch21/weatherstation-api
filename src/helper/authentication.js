//
// Authenticatie van JSON Web Token
//


//Het encode van een username naar een Token
const jwt = require('jwt-simple');
const {
    secret,
    secretKey
} = require('../config/config')
const crypto = require('crypto');

function encodeToken(username, password) {
    const playload = {
        StudentCode: username,
        Password: password
    };
    return jwt.encode(playload, secretKey)
}


// Het decoden van de Token naar een username
function decodeToken(token, callback) {

    try {
        const payload = jwt.decode(token, secretKey);
        //Check of de Token niet verlopen is.
        callback(null, payload);
    } catch (err) {
        callback(err, null)
    }
}

function hash(string) {

    return crypto.createHmac('sha256', secret)
        .update(string)
        .digest('hex');
}


module.exports = {
    encodeToken,
    decodeToken,
    hash
};