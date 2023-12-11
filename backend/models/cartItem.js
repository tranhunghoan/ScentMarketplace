'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cartID',
        targetKey: 'id',
        as: 'cart'
      })
    }
  }
  CartItem.init({
    cartID: DataTypes.INTEGER,
    proID: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};