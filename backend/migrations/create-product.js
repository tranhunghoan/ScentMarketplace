"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        image: { type: Sequelize.STRING },
        sex: { type: Sequelize.STRING },
        concentration: { type: Sequelize.STRING },
        incense: { type: Sequelize.STRING },
        price: { type: Sequelize.STRING },
        brand: { type: Sequelize.STRING },
        origin: { type: Sequelize.STRING },
        style: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING },
        description:{ type: Sequelize.STRING },
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
    await queryInterface.dropTable("Products");
  },
};
