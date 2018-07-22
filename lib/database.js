const Sequelize = require('sequelize'),
    settings = require('../settings');

module.exports = new Sequelize(settings.DB, settings.DB_USER, settings.DB_PW, {
    dialect: 'mysql'
});