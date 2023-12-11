'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PurchaseHistory.belongsTo(models.User, {
        foreignKey: 'userID'
      })
      PurchaseHistory.hasOne(models.Cart, {
        foreignKey: 'cartID',
      })
    }
  }
  PurchaseHistory.init({
    userID: DataTypes.INTEGER,
    cartID: DataTypes.INTEGER,
    payment: DataTypes.INTEGER,
    amountPaid: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'PurchaseHistory',
  });
  return PurchaseHistory;
};