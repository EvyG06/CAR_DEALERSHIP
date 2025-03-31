'use strict';
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      this.hasMany(models.Sales, { foreignKey: 'employeeId' });
      this.hasMany(models.Customers, { foreignKey: 'employeeId' });
      this.hasMany(models.Order, { foreignKey: 'employeeId' });
 
    }
  }
  Employee.init({

    nombre: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Comisiones:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },
    tareas: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'Employees',
  });
  return Employee;
};