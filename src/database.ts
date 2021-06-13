import dotenv from 'dotenv';
import {Pool} from 'pg';

// init environment variables
dotenv.config();

const {POSTGRES_HOST,POSTGRES_DB,POSTGRES_TEST_DB,POSTGRES_USER,POSTGRES_PASSWORD,ENV} = process.env;

const db = (ENV==='test' ? POSTGRES_TEST_DB : POSTGRES_DB);

const client = new Pool({
    host: POSTGRES_HOST,
    database: db,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });

export default client;
