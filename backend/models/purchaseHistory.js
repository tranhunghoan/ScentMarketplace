'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PurchaseHistory extends Model {
    static associate(models) {
      PurchaseHistory.belongsTo(models.User, {
        foreignKey: 'userID'
      });
      PurchaseHistory.hasOne(models.Cart, {
        foreignKey: 'cartID',
      });
    }
  }

  PurchaseHistory.init({
    userID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true, 
    },
    cartID: DataTypes.INTEGER,
    payment: DataTypes.INTEGER,
    amountPaid: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'PurchaseHistory',
  });

  return PurchaseHistory;
};
