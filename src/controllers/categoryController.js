const {category} = require('../models/category');
const sequelize = require('sequelize');
const { request, response } = require('express');

module.exports = {
    getAllCategory: async (request, response, next) => {
        let getAll = await category.findAll({
            where: {
                isDeleted: false
            }
        })
        console.log('Get all data', getAll);
        return response.status(200).send({
            success: true,
            data: getAll
        })
    },
    createCategory: async (request, response, next) => {
        let create = await category.create({
            category: request.body.category
        })
        console.log("create category", create)
        return response.status(200).send({
            success: true,
            message: 'New category has been created',
            data: create
        })
    },
    modifyCategory: async (request, response, next) => {
        try {
            let modify = await category.update({
                category: request.body.category
            }, {
                where: {
                    id: request.body.id
                }
            })
            response.status(200).send({
                success: true,
                message: "Category has updated",
                data: modify
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}