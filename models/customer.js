'use strict';

const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
   
      Nombre: { // Changed from nombre
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: { // Changed from correo
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Added unique constraint
      },
      Dirección: { // Changed from dirección
        type: DataTypes.STRING,
        allowNull: false,
      },
      Telefono: { // Changed from teléfono
        type: DataTypes.STRING,
        allowNull: false,
      },
      Preferencias: {
        type: DataTypes.STRING,
      },
      Seguimiento: {
        type: DataTypes.STRING,
      },
      ÚltimoSeguimiento: {
        type: DataTypes.DATE,
      },
   }, {});

  Customer.associate = function(models) {
    if (models.Order) {
      Customer.hasMany(models.Order, { foreignKey: 'customerId' });
    }
  };

  return Customer;
};
