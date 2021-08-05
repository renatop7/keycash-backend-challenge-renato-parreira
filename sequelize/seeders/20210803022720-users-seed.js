'use strict';

const model = require('../models/index');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    model.Users.beforeCreate((user, options) => {
      return bcrypt
        .hash(user.password, 10)
        .then((hash) => {
          user.password = hash;
        })
        .catch((err) => {
          throw new Error(err);
        });
    });

    return await model.Users.bulkCreate(
      [
        {
          name: 'Usuário 1',
          email: 'usuario1@keycash.com',
          password: 'teste123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Usuário 2',
          email: 'usuario2@keycash.com',
          password: 'teste123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Usuário 3',
          email: 'usuario3@keycash.com',
          password: 'teste123',
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
