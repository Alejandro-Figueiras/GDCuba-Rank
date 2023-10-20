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

export const addUser = async ({ user, password, phone, accountID }) => {
  // const insertQuery = `INSERT INTO users(username, password, phone, status) VALUES('${user}', '${password}', '${phone}', 'v')`;
  const insertQuery = `INSERT INTO users(username, password, phone, accountID) VALUES('${user}', '${password}', '${phone}', '${accountID}')`;
  console.log(insertQuery);
  return await secureQuery(insertQuery);
};

export const cleanTable = async (table) => {
  const insertQuery = `DELETE FROM ${table}`;
  console.log(insertQuery);
  return await secureQuery(insertQuery);
};

export const validateUser = async(username) => {
  const modifyQuery = `UPDATE users SET status = 'v' WHERE username = '${username}'`;
  return await secureQuery(modifyQuery);
}


export const getUsers = async (id) => {
  const query =
    id == "all"
      ? "SELECT * from users"
      : `SELECT * from users WHERE accountid = '${id}'`;

  const queryResult = await secureQuery(query);
  if (!queryResult.error) {
    return queryResult.result;
  } else {
    console.error("Error at getUsers: ", queryResult.error);
    return -1;
  }
};
