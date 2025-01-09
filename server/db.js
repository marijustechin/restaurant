const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  // Konstruktoriuje nurodome konfigūraciją
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  { dialect: "postgres", host: process.env.DB_HOST, port: process.env.DB_PORT }
);
