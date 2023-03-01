const { request, response } = require('express');
const { users, role } = require('../models');
const sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');
let salt = bcrypt.genSaltSync(10);


module.exports = {
    // Get all user
    getUsers: async (request, response, next) => {
        try {
            let get = await users.findAll({
                attributes: { exclude: ['password', 'uuid', 'id'] },
                where: {
                    isDeleted: false
                }
            })
            return response.status(200).send(get)
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // Add new user (Register)
    createUser: async (request, response, next) => {
        try {
            request.body.password = bcrypt.hashSync(request.body.password, salt);
            
            let create = await users.create({
                uuid: uuidv4(),
                username: request.body.username,
                email: request.body.email,
                password: request.body.password,
                role: request.body.roleId
            })
            return response.status(200).send({
                success: true,
                message: `You have created new user as ${request.body.roleId}`,
                data: create
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // Soft delete coyyyy
    deleteUsers: async (request, response, next) => {
        try {
            let remove = await users.update({
                isDeleted: true
            }, {
                where: {
                    email: request.body.email
                }
            });
            console.log("Removed account: ", remove);
            return response.status(200).send({
                success: true,
                message: 'The account has been deleted'
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // Changing role as cashier from admin or otherwise (:
    editUsers: async (request, response, next) => {
        try {
            let edited = await users.update({
                roleId: request.body.roleId
            }, {
                where: {
                    email: request.body.email
                }
            })
            return response.status(200).send({
                success: true,
                message: "Role is updated",
                data: edited
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}