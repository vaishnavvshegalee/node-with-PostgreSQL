 const { Pool } = require('pg');
 const {config} = require('dotenv');
 config();
 const pool = new Pool({
    user:process.env.USER,
    host:process.env.HOST,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    port:process.env.D_PORT
 });

 pool.connect().then(()=>{
   console.log('Databse Connected');
 }).catch((err)=>{
   throw Error('Connection error: ',err.message)
 });
 module.exports = pool;