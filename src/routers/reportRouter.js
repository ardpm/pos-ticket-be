const express = require('express');
const { getSalesByDay, filterByDate } = require('../controllers/reportController');
const route = express.Router(); 

route.get('/sales', getSalesByDay);
route.get('/date', filterByDate);

module.exports = route;