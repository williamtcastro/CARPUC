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
    username: 'docker',
    password: 'docker',
    database: 'pucar',
    host: '127.0.0.1',
    dialect: 'postgress',
    port: '25432',
  },
  production: {
    database: 'd4ksi7mhs7gpe4',
    username: 'rzbdqxncmfrxgk',
    password:
      'd9445d88eaf84ab10ca6d4395a91c4b64fa158b6e020b0e6cc695127a01b6dfd',
    host: 'ec2-107-20-153-39.compute-1.amazonaws.com',
    port: '5432',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
