'use strict';
module.exports = (sequelize, DataTypes) => {
  var EmployeeJobHistory = sequelize.define('EmployeeJobHistory', {
    year: DataTypes.DATE,
    department: DataTypes.STRING,
    title: DataTypes.STRING,
    bargining_unit_num: DataTypes.STRING,
    salary: DataTypes.STRING,
    overtime_pay: DataTypes.STRING,
    total_earnings: DataTypes.STRING,
    hire_date: DataTypes.DATE,
    terminate_date: DataTypes.DATE,
    terminate: DataTypes.STRING
  }, {});
  EmployeeJobHistory.associate = function(models) {
    // associations can be defined here
  };
  return EmployeeJobHistory;
};