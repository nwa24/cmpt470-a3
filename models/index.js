const { Sequelize } = require('sequelize');

const dbConfig = require('../config/db_config');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models
db.rectangles = require('./rectangles')(sequelize, Sequelize);

module.exports = db;
