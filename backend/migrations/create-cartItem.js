"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CartItems", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        cartID: { 
          type: Sequelize.INTEGER,
          references: {
            model: 'carts',
            key: 'id'
          }
        },
        proID: { 
          type: Sequelize.INTEGER,
        },
        quantity: { type: Sequelize.INTEGER },
        price: { type: Sequelize.STRING },
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
    await queryInterface.dropTable("CartItems");
  },
};
