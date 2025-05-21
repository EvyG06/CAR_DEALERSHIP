'use strict';

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    FechaDeVenta: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW 
    },
    Precio: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false
    },
    MetodoDePago: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Sales.associate = function(models) {
    if (models.Order) {
      Sales.belongsTo(models.Order, { foreignKey: 'orderId' });
    }
  };

  return Sales;
};