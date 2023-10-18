import { RequestResult } from "@/models/RequestResult.js";
import config from "./db.config.js";
import { Pool } from "pg"

const createPool = async() => {
  const pool = new Pool(config);
  return pool;
}

export const secureQuery = async (query) => {
  const queryResult = new RequestResult()//{ result: undefined, error: undefined };

  const pool = await createPool();
  try {
    const client = await pool.connect();
    const result = await pool.query(query);
    console.log(query, result.rows);

    queryResult.result = result;
    client.release();
  } catch (err) {
    queryResult.error = err;
  }

  pool.end()
  return queryResult;
};

export const addUser = async ({ user, acount }) => {
  const pool = await createPool();
  const insertQuery = `INSERT INTO users(username, accountID) VALUES('${user}','${acount}')`;
  try {
    const result = await pool.query(insertQuery);
    pool.end()
    console.log("User insert successfuly");
  } catch (err) {
    console.error("Error at insert user: ", err);
    pool.end()
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
