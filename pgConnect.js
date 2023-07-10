const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const { HOST, DATABASE, USERNAME, PASSWORD } = process.env;

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
  });

/* exports.connect = async () => { 
    
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
 */
exports.initialize = () => {
    return new Promise((resolve, reject)=>{
        sequelize.sync().then(function(){ //.authenticate
            resolve('Database Connected');
        }).catch((e)=>{reject(`${e}, unable to connect to the database`)});
    });
};

module.exports.sequelize;