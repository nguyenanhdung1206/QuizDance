const Sequelize = require('sequelize');

const env = {
    database: 'db242hjvu3i7sa',
    username: 'endwmtrdahhgli',
    password: '13a4d7f8e5b3f83c3fa253f214bb44fb22d725aed41cf993cd9fb872d0c46c08',
    host: 'ec2-54-235-116-235.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

module.exports = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    port: env.port,
    dialect: env.dialect,
    operatorsAliases: false,
    
    dialectOptions: {
      ssl: {
          rejectUnauthorized: false
      }
    },

    define: {
        timestamps: false
    },
   
    pool: {
      max: env.max,
      min: env.pool.min,
      acquire: env.pool.acquire,
      idle: env.pool.idle
    }
  });