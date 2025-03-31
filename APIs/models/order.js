'use strict';

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Maintenance extends Model {  
    static associate(models) {
      this.hasMany(models.customers, { foreignKey: 'orderId' });
      this.belongsTo(models.sales, { foreignKey: 'vehicleId' });
    }
  }

  Order.init(
    {
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      FechaDeOrden: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
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
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );

  Order.associate = function(models) {
    Order.belongsTo(models.Supplier, { foreignKey: 'supplierId' });
    Order.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
  };
  

  return Order;
};