'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      street: {
        type: Sequelize.TEXT
      },
      number: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      complement: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      district: {
        type: Sequelize.TEXT
      },
      cityId: {
        type: Sequelize.INTEGER
      },
      stateId: {
        type: Sequelize.INTEGER
      },
      countryId: {
        type: Sequelize.INTEGER
      },
      zipCode: {
        type: Sequelize.INTEGER
      },
      propertyId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Addresses');
  }
};