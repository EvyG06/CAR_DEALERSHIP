'use strict';

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    static associate(models) {
      Sale.belongsTo(models.Customer, { foreignKey: 'customerId' });
      Sale.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
  
    }
  }
  Supplier.init({
    Customerid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Customer',
        key: 'id'
      }
    },
    Vehicleid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Vehicle',
        key: 'id'
      }
    },
    FechaDeVenta: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
    },
    Precio: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    MetodoDePago: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
 
    sequelize,
    modelName: 'Supplier',
  });
  return Supplier;
};