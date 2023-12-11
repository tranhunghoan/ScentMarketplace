"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PurchaseHistories", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        userID: { 
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        cartID: { 
          type: Sequelize.INTEGER,
          unique: true,
          references: {
            model: 'carts',
            key: 'id'
          }
        },
        payment: { type: Sequelize.INTEGER },
        amountPaid: { type: Sequelize.STRING },
        createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PurchaseHistories");
  },
};
