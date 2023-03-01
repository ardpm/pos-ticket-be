const { response, request } = require('express');
const { Op, Sequelize } = require('sequelize');
const { transaction } = require('../models/transaction');

module.exports = {
    getSalesByDay: async (response, request, next) => {
        try {
            let get = await transaction.findAll({
                attributes: [
                    [transaction.sequelize.fn('date_trunc', 'day', transaction.sequelize.col('createdAt')), 'date'],
                    [transaction.sequelize.fn('sum', transaction.sequelize.col('total')), 'total_sales'],
                ],
                group: [transaction.sequelize.fn('date_trunc','day',transaction.col('createdAt'))],
                where: {
                    createdAt: {
                        [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000), // mengambil data dari 30 hari terakhir
                    }
                }
            });
            response.status(200).send({
                success: true,
                data: get
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    },

    filterByDate: async (request, response, next) => {
        const { startDate, endDate } = request.query;

        try {
            let filter = await transaction.findAll({
                attributes: [
                    [transaction.sequelize.fn('date_trunc', 'day', transaction.sequelize.col('createdAt')), 'date'],
                    [transaction.sequelize.fn('sum', transaction.sequelize.col('total'), 'total_sales')]
                ],
                group: [],
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
            response.status(200).send({
                success: true,
                message:"Filtered sales report",
                data: filter
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}