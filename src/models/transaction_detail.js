'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction_Detail.init({
    Quantity: DataTypes.INTEGER,
    Price: DataTypes.INTEGER,
    Total: DataTypes.INTEGER,
    IdProduct: DataTypes.INTEGER,
    IdTransaction:DataTypes.INTEGER,
    IDStatus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction_Detail',
  });
  return Transaction_Detail;
};