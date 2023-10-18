import pool from "./db.config.js";
import RequestResult from '../models/RequestResult.js';
import { log } from "../libs/utils.js";

export const secureQuery = async (query) => {
  const queryResult = new RequestResult({});

  try {
    const client = await pool.connect();
    const result = await pool.query(query);
    console.log(query, result.rows);

    queryResult.result = result;
    client.release();
  } catch (err) {
    queryResult.error = err;
  }

  return queryResult;
};

export const addUser = async ({ user, acount, password }) => {
  const insertQuery = `INSERT INTO users(username, accountID, password) VALUES('${user}','${acount}', '${password}')`;
  try {
    const result = await secureQuery(insertQuery);
    console.log("User insert successfuly");
  } catch (err) {
    console.error("Error at insert user: ", err);
  }
};

export const getUsers = async (id) => {
  const query =
    id == "all"
      ? "SELECT * from users"
      : `SELECT * from users WHERE accountid = '${id}'`;
  
    const result = await secureQuery(query)
    return result;
  
};
