'use strict';

const model = require('../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await model.Countries.bulkCreate(
      [
        {
          id: 1,
          name: 'Brasil',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
