const express = require('express');
const { getAllCategory, createCategory, modifyCategory } = require('../controllers/categoryController');
const route = express.Route();

route.get('/', getAllCategory);
route.post('/', createCategory);
route.patch('/modify', modifyCategory);

module.exports = route;