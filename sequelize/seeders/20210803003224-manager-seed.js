'use strict';

const model = require('../models/index');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await model.Managers.beforeCreate((manager, options) => {
      return bcrypt
        .hash(manager.password, 10)
        .then((hash) => {
          manager.password = hash;
        })
        .catch((err) => {
          throw new Error(err);
        });
    });

    return await model.Managers.bulkCreate(
      [
        {
          name: 'Admin',
          email: 'admin@keycash.com',
          role: 1,
          password: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { individualHooks: true },
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
