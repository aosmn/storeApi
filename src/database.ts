import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } = process.env;

const client = new Pool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT!, 10)
});

export default client;
