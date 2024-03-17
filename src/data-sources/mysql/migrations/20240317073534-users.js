'use strict';

/** @type {import('sequelize-cli').Migration} */
const tableName = 'users';

module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(75),
        allowNull: false
      },
      address: {
        type: Sequelize.STRING(75),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(75),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(75),
        allowNull: false
      },
      photos: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  }
};