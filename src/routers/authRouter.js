const { login, keepLogin, logout } = require('../controllers/authController');
const route = require('express').Router();


route.post('/login', login);
route.get('/keeplogin', keepLogin);
route.delete('/logout', logout);

module.exports = route;