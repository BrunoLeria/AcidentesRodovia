const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    socketPath: "/var/run/mysqld/mysqld.sock",
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  timezone: "-03:00",
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users.model.js")(sequelize, Sequelize);
db.reports = require("./reports.model.js")(sequelize, Sequelize);
module.exports = db;
