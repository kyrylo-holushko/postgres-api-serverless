const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const { HOST, DATABASE, USERNAME, PASSWORD } = process.env;

exports.sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
  });

exports.connect = async () => { 
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};