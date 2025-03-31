'use strict';

const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    static associate(models) {
      this.hasMany(models.Sales, { foreignKey: 'customerId' });
      this.hasMany(models.Order, { foreignKey: 'customerId' });
    }
    
    }   

    customer.init({

      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dirección: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      teléfono: {
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
    }, {
      sequelize,
      modelName: 'customer',
    });
  
    return customer;
  }

