//const { Sequelize } = require('sequelize');
const postgres = require('postgres');
const dotenv = require('dotenv');
dotenv.config();
const { PGHOST, PGDATABASE, PGUSERNAME, PGPASSWORD } = process.env;
console.log(PGHOST, PGDATABASE, PGUSERNAME, PGPASSWORD);


const sql = postgres({
  host                 : PGHOST,            // Postgres ip address[s] or domain name[s]
  port                 : 5432,          // Postgres server port[s]
  database             : PGDATABASE,            // Name of database to connect to
  username             : PGUSERNAME,            // Username of database user
  password             : PGPASSWORD            // Password of database user
});

/* const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
  }); */

/* exports.connect = async () => { 
    
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
 */
/* exports.initialize = () => {
    return new Promise((resolve, reject)=>{
        sequelize.sync().then(function(){ //.authenticate
            resolve('Database Connected');
        }).catch((e)=>{reject(`${e}, unable to connect to the database`)});
    });
};  */

/* exports.initialize = () => {
    return new Promise((resolve, reject)=>{
        
        sql = postgres('postgres://username:password@host:port/database', {
            host                 : PGHOST,            // Postgres ip address[s] or domain name[s]
            port                 : 5432,          // Postgres server port[s]
            database             : PGDATABASE,            // Name of database to connect to
            username             : PGUSERNAME,            // Username of database user
            password             : PGPASSWORD            // Password of database user
        });
        if(sql)
            resolve('Database Connected');
        else
            reject('Could not connect to Database');
        
    });
};  */

module.exports.sql = sql;