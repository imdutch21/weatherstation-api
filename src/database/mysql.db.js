let mysql = require('mysql');
let config = require('../config/config');
const ApiError = require('../models/ApiError')

let con = mysql.createConnection({
  host: config.databaseHost,
  user: config.databaseUsername,
  password: config.databasePassword,
  database: "xrsolu1q_weatherstation"
});

con.connect(function (err) {
  if (err) {
      console.log(new ApiError("Can't connect to DB", 500))
  }
});

module.exports = con