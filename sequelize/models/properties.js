'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Properties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Properties.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    area: DataTypes.DOUBLE,
    price: DataTypes.DECIMAL,
    rooms: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    parkingSpaces: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    propertyTaxPrice: DataTypes.DECIMAL,
    condoPrice: DataTypes.DECIMAL,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Properties',
  });
  return Properties;
};