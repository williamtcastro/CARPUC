module.exports = {
  development: {
    username: 'root',
    password: 'docker',
    database: 'pucar',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: '3307',
  },
  test: {
    username: 'root',
    password: 'docker',
    database: 'pucar',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: '3307',
  },
  production: {
    username: 'docker',
    password: 'docker',
    database: 'pucar',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: '25432',
  },
};
