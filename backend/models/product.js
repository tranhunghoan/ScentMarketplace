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
    image: DataTypes.STRING,
    sex: DataTypes.STRING,
    concentration: DataTypes.STRING,
    incense: DataTypes.STRING,
    price: DataTypes.STRING,
    brand: DataTypes.STRING,
    origin: DataTypes.STRING,
    style: DataTypes.STRING,
    name: DataTypes.STRING,
    description:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};