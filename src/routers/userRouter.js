const express = require('express');
const route = express.Router();
const {getUsers, createUser, deleteUsers, editUsers} = require('../controllers/userController');

route.get('/', getUsers);
route.post('/', createUser);
route.patch('/', deleteUsers);
route.patch('/edituser', editUsers);

module.exports = route;
