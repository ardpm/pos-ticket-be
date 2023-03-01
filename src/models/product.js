'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Product',
  });

  product.associate = (models) => {
    product.belongsTo(models.category, { foreignKey: 'categoryId' });
  }
  return product;
};