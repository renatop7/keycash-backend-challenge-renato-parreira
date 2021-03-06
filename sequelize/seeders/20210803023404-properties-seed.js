'use strict';

const model = require('../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return await model.Properties.bulkCreate(
      [
        {
          title: 'Imóvel 1',
          description: 'Descrição do imóvel 1',
          area: 20.0,
          price: 20000.0,
          rooms: 1,
          categoryId: 1,
          parkingSpaces: 1,
          bathrooms: 1,
          propertyTaxPrice: 10.0,
          condoPrice: 100.0,
          ownerId: 1,
        },
        {
          title: 'Imóvel 2',
          description: 'Descrição do imóvel 2',
          area: 25.0,
          price: 40000.0,
          rooms: 2,
          categoryId: 2,
          parkingSpaces: 1,
          bathrooms: 1,
          propertyTaxPrice: 100.0,
          condoPrice: 100.0,
          ownerId: 1,
        },
        {
          title: 'Imóvel 3',
          description: 'Descrição do imóvel 3',
          area: 30.0,
          price: 60000.0,
          rooms: 3,
          categoryId: 3,
          parkingSpaces: 1,
          bathrooms: 1,
          propertyTaxPrice: 100.0,
          condoPrice: 100.0,
          ownerId: 2,
        },
        {
          title: 'Imóvel 4',
          description: 'Descrição do imóvel 4',
          area: 35.0,
          price: 80000.0,
          rooms: 4,
          categoryId: 4,
          parkingSpaces: 2,
          bathrooms: 1,
          propertyTaxPrice: 100.0,
          condoPrice: 100.0,
          ownerId: 2,
        },
        {
          title: 'Imóvel 5',
          description: 'Descrição do imóvel 5',
          area: 40.0,
          price: 100000.0,
          rooms: 4,
          categoryId: 1,
          parkingSpaces: 3,
          bathrooms: 1,
          propertyTaxPrice: 100.0,
          condoPrice: 100.0,
          ownerId: 3,
        },
        {
          title: 'Imóvel 6',
          description: 'Descrição do imóvel 6',
          area: 50.0,
          price: 200000.0,
          rooms: 3,
          categoryId: 2,
          parkingSpaces: 1,
          bathrooms: 1,
          propertyTaxPrice: 100.0,
          condoPrice: 100.0,
          ownerId: 3,
        },
        {
          title: 'Imóvel 7',
          description: 'Descrição do imóvel 7',
          area: 55.0,
          price: 300000.0,
          rooms: 3,
          categoryId: 5,
          parkingSpaces: 2,
          bathrooms: 1,
          propertyTaxPrice: 100.0,
          condoPrice: 100.0,
          ownerId: 1,
        },
        {
          title: 'Imóvel 8',
          description: 'Descrição do imóvel 8',
          area: 60.0,
          price: 500000.0,
          rooms: 3,
          categoryId: 6,
          parkingSpaces: 3,
          bathrooms: 1,
          propertyTaxPrice: 100.0,
          condoPrice: 100.0,
          ownerId: 1,
        },
      ],
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
