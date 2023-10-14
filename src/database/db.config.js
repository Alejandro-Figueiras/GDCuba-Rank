import pkg from "pg";
import { log } from "../libs/utils.js";
const { Pool } = pkg;

const dbCredentials = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
};

const pool = new Pool(dbCredentials);

pool.connect()
.then(() => log('conectado'))
.catch((err) => {
  log(err)
  log(dbCredentials)
})

export default pool;


