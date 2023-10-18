import { RequestResult } from "@/models/RequestResult.js";
import config from "./db.config.js";
import { Pool } from "pg";

const createPool = async () => {
  const pool = new Pool(config);
  return pool;
};

export const secureQuery = async (query) => {
  const queryResult = new RequestResult(); //{ result: undefined, error: undefined };

  const pool = await createPool();
  try {
    const result = await pool.query(query);
    // console.log(query, result.rows);

    queryResult.result = result;
  } catch (err) {
    queryResult.error = err;
  }

  pool.end();
  return queryResult;
};

export const addUser = async ({ user, account, password, phone }) => {
  const insertQuery = `INSERT INTO users(username, password, phone) VALUES('${user}', '${password}', '${phone}')`;
  console.log(insertQuery);
  return await secureQuery(insertQuery);
};

export const getUsers = async (id) => {
  const query =
    id == "all"
      ? "SELECT * from users"
      : `SELECT * from users WHERE accountid = '${id}'`;

  const result = await secureQuery(query);
  return result;
};
