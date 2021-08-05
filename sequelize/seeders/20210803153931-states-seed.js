'use strict';

const model = require('../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await model.States.bulkCreate([
      {
        id: 1,
        name: 'Minas Gerais',
        countryId: 1,
        uf: 'MG',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Rio de Janeiro',
        countryId: 1,
        uf: 'RJ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Santa Catarina',
        countryId: 1,
        uf: 'SC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'São Paulo',
        countryId: 1,
        uf: 'SP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
