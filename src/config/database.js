const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_name", "db_user", "db_password", {
  host: "db_host",
  port: "3306",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
