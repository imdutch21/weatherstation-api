const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const morgan = require('morgan');
const cors = require('cors');
const chalk = require('chalk');

//initialte
let app = express();
const http = require('http').Server(app);

const {
    port
} = require('./config/config');

// bodyParser parses the body from a request
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));

// parse application/vnd.api+json as json
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/json'
}));
app.use(morgan('dev'));
app.use(cors());

app.use("*", (req, res, next) => {
    console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    next();
})

app.use('/api', routes);

// Catch-all error handlers
app.use((err, req, res, next) => {
    console.log(chalk.red(err));
    if(!chalk)
        console.log(err);
    res.status((err.code || 404)).json(err).end();
});

function shutdown() {
    console.log(chalk.red('[APP] Application shutting down...'));
    process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

http.listen(port, () => console.log(chalk.green('[SERVER] Server running on port ' + port)));

module.exports = app;