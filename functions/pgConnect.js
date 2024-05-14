const postgres = require('postgres');
const dotenv = require('dotenv');
dotenv.config();
const { PGHOST, PGDATABASE, PGUSERNAME, PGPASSWORD } = process.env;

const sql = postgres({
    host                 : PGHOST,            // Postgres ip address[s] or domain name[s]
    port                 : 5432,          // Postgres server port[s]
    database             : PGDATABASE,            // Name of database to connect to
    username             : PGUSERNAME,            // Username of database user
    password             : PGPASSWORD            // Password of database user
});

console.log('Connected to Postgres DB:',PGHOST);

module.exports.sql = sql;