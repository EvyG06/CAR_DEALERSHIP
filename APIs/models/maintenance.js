'use strict';

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Maintenance extends Model {
    static associate(models) {
      this.belongsTo(models.vehicles, { foreignKey: 'vehicleId' });
      this.belongsTo(models.employees, { foreignKey: 'employeeId' });
    }
  }
  Maintenance.init({
    vehicleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'vehicles',
        key: 'id'
      }
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    Garantía: {
      type: DataTypes.DATE,
      allowNull: false
    },
    TipoDeMantenimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripción: {
      type: DataTypes.STRING,
      allowNull: false
    },
   
    sequelize,
    modelName: 'Maintenance',
  });
  return Maintenance;
};