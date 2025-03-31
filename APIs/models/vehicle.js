'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  Vehicle.hasMany(models.Order, { foreignKey: 'vehicleId' }); 
  Vehicle.hasMany(models.OrderDetail, { foreignKey: 'vehicleId' });
  Vehicle.hasMany(models.Sale, { foreignKey: 'vehicleId' });

  Vehicle.init(
    {
      Marca: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Modelo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Año: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      características: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'disponible',
      },
    },
    {
      sequelize,
      modelName: 'Vehicle',
    }
  );

  return Vehicle;
};