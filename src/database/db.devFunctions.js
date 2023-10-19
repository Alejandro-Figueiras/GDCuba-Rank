import { random } from "lodash";
import { secureQuery } from "./db.functions.js";

export const databaseConnect = () => {
  pool.connect((err, client, done) => {
    if (err) {
      console.error("Error to connect  to database");
      return { state: "error", error: err };
    }
    console.log("Connection to database established");
    return { state: "ok" };
  });
};
// // For debbugin only
// databaseConnect();

export const removeTable = async (table) => {
  try {
    const result = await pool.query(`DROP TABLE ${table}`);
    console.log(`Tabla ${table} eliminada con éxito`);
  } catch (error) {
    console.error(`Error al eliminar la tabla ${table}:`, error);
  }
};

export const createUserTable = async () => {
  const createQuery = `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(15) NOT NULL,
        accountID INTEGER
    );`;
  try {
    const result = await pool.query(createQuery);
    console.log("Table create successfuly");
  } catch (err) {
    console.error("Error at create table: ", err);
  }
};

export const addColumn = async() => {
  const r = await secureQuery(`ALTER TABLE users ADD COLUMN role VARCHAR(10) NOT NULL DEFAULT 'user'`);
  return r;
}

export const consult = async(table) => {
  return await secureQuery(`SELECT * FROM ${table}`);
}

// Prueba de Backend 1

export const testUserQuery = async () => {
  const query = `SELECT * FROM users WHERE username='test'`;
  const queryResult = await secureQuery(query);
  if (!queryResult.error) {
    return queryResult.result;
  } else {
    console.error("Error at test user create: ", queryResult.error);
    return -1;
  }
};

export const testUserInsertQuery = async () => {
  const query = "INSERT INTO users (username, accountID) VALUES('test', 10)";
  const queryResult = await secureQuery(query);
  if (!queryResult.error) {
    console.log("Test user create successfuly");
  } else {
    console.error("Error at test user create: ", queryResult.error);
  }
};

export const testUserChange = async() => {
  let rm = random(0,50); console.log(`Changing test user ${rm}`);
  const query = `UPDATE users SET accountid=${rm} WHERE username='test'`;
  const queryResult = await secureQuery(query);
  if (!queryResult.error) {
    console.log("Test user change successfuly");
  } else {
    console.error("Error at test user change: ", queryResult.error);
  }
}
