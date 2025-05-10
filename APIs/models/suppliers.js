'use strict';

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

  class Suppliers extends Model {
    static associate(models) {
      this.hasMany(models.Sales, { foreignKey: 'supplierId' });
      this.hasMany(models.Order, { foreignKey: 'supplierId' });
    }
  }
  Suppliers.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    InformacióndeContacto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Dirección: {
      type: DataTypes.STRING,
      allowNull: false,
    },  
    
  }, {
    sequelize,
    modelName: 'Suppliers',
  });
  return Suppliers;
};