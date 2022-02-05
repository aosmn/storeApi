import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { DB_HOST, DB_NAME, DB_TEST_NAME, DB_USER, DB_PASSWORD, DB_PORT, ENV } = process.env;

const clientOptions = {
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT!, 10)
}

if(ENV === 'test') {
  clientOptions.database = DB_TEST_NAME;
}

const client = new Pool(clientOptions);

export default client;
