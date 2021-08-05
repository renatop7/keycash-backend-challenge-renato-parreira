'use strict';

const model = require('../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await model.Addresses.bulkCreate(
      [
        {
          street: 'Rua Belo Horizonte',
          number: 1,
          complement: 'apto 1',
          district: 'Bairro',
          cityId: 1,
          stateId: 1,
          countryId: 1,
          propertyId: 1,
          zipCode: '88088000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: 'Rua Rio de Janeiro',
          number: 1,
          complement: 'apto 1',
          district: 'Bairro',
          cityId: 2,
          stateId: 2,
          countryId: 1,
          propertyId: 2,
          zipCode: '88088000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: 'Rua Florianópolis',
          number: 1,
          complement: 'apto 1',
          district: 'Bairro',
          cityId: 3,
          stateId: 3,
          countryId: 1,
          propertyId: 3,
          zipCode: '88088000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: 'Rua São Paulo',
          number: 1,
          complement: 'apto 1',
          district: 'Bairro',
          cityId: 4,
          stateId: 4,
          countryId: 1,
          propertyId: 4,
          zipCode: '88088000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: 'Rua Contagem',
          number: 1,
          complement: 'apto 1',
          district: 'Bairro',
          cityId: 5,
          stateId: 1,
          countryId: 1,
          propertyId: 5,
          zipCode: '88088000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: 'Rua Niterói',
          number: 1,
          complement: 'apto 1',
          district: 'Bairro',
          cityId: 6,
          stateId: 2,
          countryId: 1,
          propertyId: 6,
          zipCode: '88088000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: 'Rua Cricúma',
          number: 1,
          complement: 'apto 1',
          district: 'Bairro',
          cityId: 7,
          stateId: 3,
          countryId: 1,
          propertyId: 7,
          zipCode: '88088000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: 'Rua Campinas',
          number: 1,
          complement: 'apto 1',
          district: 'Bairro',
          cityId: 8,
          stateId: 4,
          countryId: 1,
          propertyId: 8,
          zipCode: '88088000',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
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
  }
};
