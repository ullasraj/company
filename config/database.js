require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: "root",
    database: "Company",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "root",
    database: "company_test",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
