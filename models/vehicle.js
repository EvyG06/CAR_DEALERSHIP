'use strict';

module.exports = (sequelize, DataTypes) => {


  const Vehicle = sequelize.define('Vehicle', {
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
  }, {
    timestamps: false,
  });

Vehicle.associate = function(models) {
    if (models.Order) {
      Vehicle.hasMany(models.Order, { foreignKey: 'vehicleId' });
    }
  };

  return Vehicle;
};