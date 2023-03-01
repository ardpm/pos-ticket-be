// const { request, response } = require('express');
// const { users, role } = require('../models');
// const sequelize = require('sequelize');


// export const getUsers = async (request, response, next) => {
//     try {
//         const getAll = await users.findAll({
//             attributes: ['uuid', 'name', 'email', 'role']
//         });
//         response.status(200).json({
//             success: true,
//             data: getAll,
//         });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// }

// export const getUserById = async (request, response, next) => {
//     try {
//         const getUser = await users.findOne({
//             attributes: ['uuid', 'name', 'email', 'role'],
//             where: {
//                 uuid: request.params.id
//             }
//         });
//         response.status(200).json({
//             success: true,
//             data: getUser
//         });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// }

// export const createUser = async (request, response, next) => {
//     try {
//         console.log('ini dari request.body: ', request.body)
//         const { name, email, password, confirmationPassword, role } = request.body;
//         if (password == confirmationPassword) {
//             delete request.body.confirmationPassword;
//             let salt = bcrypt.genSaltSync(10);
//             password = bcrypt.hashSync(password, salt);

//             let created = await users.create({
//                 name: name,
//                 email: email,
//                 password: password,
//                 role: role
//             })

//             response.status(200).json({
//                 success: true,
//                 data: created,
//                 message: "New account has created."
//             })
//         } else {
//             response.status(400).json({ msg: "Password doesn\'t match." });
//         }
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// }