import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT!, 10),
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});
