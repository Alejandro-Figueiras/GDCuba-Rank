import pool from "./db.config.js";


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
  try {
    const result = await pool.query(query);
    return {
      status: 'ok',
      result: result.rows
    }
  } catch (err) {
    return {
      status: 'err',
      error: err
    }
  }
};
