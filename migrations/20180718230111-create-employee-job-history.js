'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmployeeJobHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.DATE
      },
      department: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      bargining_unit_num: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.STRING
      },
      overtime_pay: {
        type: Sequelize.STRING
      },
      total_earnings: {
        type: Sequelize.STRING
      },
      hire_date: {
        type: Sequelize.DATE
      },
      terminate_date: {
        type: Sequelize.DATE
      },
      terminate: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EmployeeJobHistories');
  }
};