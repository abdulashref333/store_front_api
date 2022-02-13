import dotenv from 'dotenv';
import { Pool } from 'pg';
import Logger from '../src/middlewares/logger';

dotenv.config();

const ENV = process.env.ENV;
const { DB_HOST, DB_NAME, DB_TEST_NAME, DB_TEST_USERNAME, DB_USERNAME, DB_PASSWORD } = process.env;

// client it's the connection to the postgres or just a collection of many connections.
// it's a pool of ready threads.
let client: Pool;

if (ENV === 'dev') {
  console.log();

  client = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USERNAME,
    password: DB_PASSWORD,
  });
} else {
  client = new Pool({
    host: DB_HOST,
    database: DB_TEST_NAME,
    user: DB_TEST_USERNAME,
    password: DB_PASSWORD,
  });
}

client.on('error', (err: any) => {
  Logger.error(err);
  process.exit(-1);
});
export default client;
