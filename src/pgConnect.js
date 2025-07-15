const postgres = require('postgres');
const dotenv = require('dotenv');
dotenv.config();
//const { PGHOST, PGDATABASE, PGUSERNAME, PGPASSWORD } = process.env;
const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

/* const sql = postgres({
    host                 : PGHOST,            // Postgres ip address[s] or domain name[s]
    port                 : 5432,          // Postgres server port[s]
    database             : PGDATABASE,            // Name of database to connect to
    username             : PGUSERNAME,            // Username of database user
    password             : PGPASSWORD,            // Password of database user
    ssl                  : 'require'
}); */

console.log('Connected to Postgres DB');

module.exports.sql = sql;