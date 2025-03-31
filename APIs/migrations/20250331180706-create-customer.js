'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nombre: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Teléfono: {
        type: Sequelize.STRING
      },
      Dirección: {
        type: Sequelize.STRING
      },
      Preferencias: {
        type: Sequelize.STRING
      },
      Seguimiento: {
        type: Sequelize.STRING
      },
      ÚltimoSeguimiento: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Customers');
  }
};
