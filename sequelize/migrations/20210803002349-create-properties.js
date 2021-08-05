//npx sequelize-cli model:generate --name Properties --attributes title:string,description:string,area:double,price:decimal,rooms:integer,type:integer,category:integer,parkingSpaces:integer,bathrooms:integer,propertyTaxPrice:decimal,condoPrice:decimal,zipCode:string,owner:integer --force

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      area: {
        type: Sequelize.DOUBLE,
      },
      price: {
        type: Sequelize.DECIMAL(13, 2),
      },
      rooms: {
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      parkingSpaces: {
        type: Sequelize.INTEGER,
      },
      bathrooms: {
        type: Sequelize.INTEGER,
      },
      propertyTaxPrice: {
        type: Sequelize.DECIMAL(13, 2),
      },
      condoPrice: {
        type: Sequelize.DECIMAL(13, 2),
      },
      ownerId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Properties');
  },
};
