module.exports = {
  dev: {
    dialect: "mysql",
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_WRITE_HOST,
    port: Number(process.env.MYSQL_PORT),
  },
  test: {
    dialect: "mysql",
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_WRITE_HOST,
    port: Number(process.env.MYSQL_PORT),
  },
  production: {
    dialect: "mysql",
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_WRITE_HOST,
    port: Number(process.env.MYSQL_PORT),
  },
  staging: {
    dialect: "mysql",
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_WRITE_HOST,
    port: Number(process.env.MYSQL_PORT),
  },
};
