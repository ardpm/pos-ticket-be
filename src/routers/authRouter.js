const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const { keepLogin,login } = require('../controllers/authController');
const readToken = require('../helper/jwt');
const checkUser = require('../helper/validator');

route.post('/', checkUser, login);
route.get('/', readToken, keepLogin);

module.exports = route;