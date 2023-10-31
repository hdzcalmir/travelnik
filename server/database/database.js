const mysql = require('mysql');
const dotenv = require('dotenv');
const { logger } = require('../utils/logger.js');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

db.on("error", (err) => {
  logger.error(err);
  console.log("Greška prilikom povezivanja s bazom podataka:", err);
});

module.exports = db;