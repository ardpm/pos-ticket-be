const { request, response } = require('express');
const { users, role } = require('../models');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const { createToken } = require('../helper/jwt');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let salt = bcrypt.genSaltSync(10);

module.exports = {
    login: async (request, response, next) => {
        try {
            let login = await users.findAll({
                where:
                    { username: request.body.username }
            })
            console.log(login[0].dataValues);

            if (login.length > 0) {
                let check = bcrypt.compareSync(request.body.password, login[0].dataValues.password);

                if (check) {
                    let { uuid, roleId, username } = login[0].dataValues;
                    let token = createToken({ uuid });
                    return response.status(200).send({
                        username: username,
                        roleId: roleId,
                        token: token
                    })
                } else {
                    response.status(400).send({
                        success: false,
                        message: "Please insert with the correct password"
                    })
                }
            } else {
                response.status(404).send({
                    success: false,
                    message: "Account not found"
                })
            }

        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    keepLogin: async (request, response, next) => {
        try {
            // console.log("Decrypt token:", request.decrypt);
            let get = await users.findAll({
                where: {
                    uuid: request.decrypt.uuid
                }
            });

            console.log("Data dari get[0].dataValues", get[0].dataValues);

            let { uuid, roleId, username } = get[0].dataValues
            let token = createToken({ uuid });

            return response.status(200).send({
                success: true,
                username: username,
                roleId: roleId,
                token: token
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}