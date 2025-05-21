'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },  
      Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      FechaDeOrden: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW 
      },
      Estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CantidadRecibida: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      validación: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
  
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW 
      },

}, {});

  Order.associate = function(models) {
    if (models.Vehicle) {
      Order.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
    }
    if (models.Customer) {
      Order.belongsTo(models.Customer, { foreignKey: 'customerId' });
    }
  };

  return Order;
};