const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  logging: false,
});

// PORT
// DB_DIALECT
// DB_HOST
// DB_USERNAME
// DB_PASSWORD
// DB_DATABASE

module.exports = { db };
