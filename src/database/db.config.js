import pkg from "pg";
const { Pool } = pkg;

const dbCredentials = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
};

const pool = new Pool(dbCredentials);

export default pool;


