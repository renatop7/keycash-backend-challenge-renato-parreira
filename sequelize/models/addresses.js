'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Addresses.init({
    street: DataTypes.TEXT,
    number: DataTypes.INTEGER,
    complement: DataTypes.TEXT,
    district: DataTypes.TEXT,
    cityId: DataTypes.INTEGER,
    stateId: DataTypes.INTEGER,
    countryId: DataTypes.INTEGER,
    zipCode: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Addresses',
  });
  return Addresses;
};