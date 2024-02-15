import mysql from 'mysql';
import dbConfig from './db.config.js';

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
});

export default connection;