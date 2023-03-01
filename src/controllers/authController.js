const { request, response } = require('express');
const { users, role } = require('../models');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const { createToken } = require('../helper/jwt');
let salt = bcrypt.genSaltSync(10);

module.exports = {

    login: async (request, response, next) => {
        try {
            let login = await users.findAll({
                where: sequelize.and({
                    password: request.body.password
                }, {
                    email: request.body.email
                }),
            });
            console.log("login check:", login);

            return response.status(200).send({
                success: true,
                data: login
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    keepLogin: async (request, response, next) => {
        try {
            console.log("ini hasil dari decript token : ", request.decript);
            let get = await users.findAll({
                where: {
                    uuid: request.decript.id,
                },
            });
            let { uuid, username, email, roleId } = get[0].dataValues;
            let token = createToken({ uuid });
            return response.status(200).send({
                success: true,
                username,
                email,
                roleId,
                token,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    logout: async (request, response, next) => {
        try {

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}