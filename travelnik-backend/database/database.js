import mysql from "mysql";
import * as dotenv from "dotenv";
import { logger } from "../utils/logger.js";
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

db.on("error", (err) => {
  logger.error(err);
  console.log("Greška prilikom povezivanja s bazom podataka:", err);
});
