const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.BD_DATA,
  username: process.env.BD_USER,
  password: process.env.BD_PASSWORD,

  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
