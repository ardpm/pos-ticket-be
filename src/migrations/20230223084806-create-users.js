'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull:false,
        type: Sequelize.STRING(45)
      },
      no_member: {
        primaryKey:true,
        type: Sequelize.STRING(10)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(13)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'cashier'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};