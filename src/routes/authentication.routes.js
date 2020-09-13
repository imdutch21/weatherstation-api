const AuthController = require('../controllers/authentication.controller');
const routes = require('express').Router();

routes.post('/login', AuthController.login);
routes.post('/register', AuthController.register);
routes.all('/login', AuthController.validateToken)
routes.get('/login', AuthController.getIsTokenVallid)
module.exports = routes;