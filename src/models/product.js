'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    Nama_Product: DataTypes.STRING,
    Harga_Product: DataTypes.INTEGER,
    Stock_Product: DataTypes.INTEGER,
    ID_Category: DataTypes.INTEGER,
    Description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};