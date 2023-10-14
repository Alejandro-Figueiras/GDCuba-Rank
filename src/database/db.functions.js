import pool from "./db.config.js";

export const secureQuery = async (query) => {
  const queryResult = { result: undefined, error: undefined };

  try {
    const client = await pool.connect();
    const result = await pool.query(query);

    queryResult.result = result;
    client.release();
  } catch (err) {
    queryResult.error = err;
  }

  return queryResult;
};

export const addUser = async ({ user, acount }) => {
  const insertQuery = `INSERT INTO users(username, accountID) VALUES('${user}','${acount}')`;
  try {
    const result = await pool.query(insertQuery);
    console.log("User insert successfuly");
  } catch (err) {
    console.error("Error at insert user: ", err);
  }
};

export const getUsers = async (id) => {
  const query =
    id == "all"
      ? "SELECT * from users"
      : `SELECT * from users WHERE id = '${id}'`;
  
    const result = await secureQuery(query)
    return result;
  
};
