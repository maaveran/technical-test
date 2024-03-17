'use strict';

/** @type {import('sequelize-cli').Migration} */
const tableName = 'credit_card_details';

module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
      },
      user_id : {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {         
          model: 'users',
          key: 'id'
        }
      },
      creditcard_type: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      creditcard_number: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      creditcard_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      creditcard_expired: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      creditcard_cvv: {
        type: Sequelize.STRING(3),
        allowNull: false
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  }
};