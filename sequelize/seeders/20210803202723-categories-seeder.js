'use strict';

const model = require('../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await model.Categories.bulkCreate([
      {
        name: 'Apartamento',
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Casa',
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kitnet',
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Loja',
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sala comercial',
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Galpão',
        typeId: 2,
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
