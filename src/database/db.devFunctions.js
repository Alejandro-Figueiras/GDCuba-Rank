import pool from "./db.config.js";

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

// Prueba de Backend 1

export const testUserQuery = async() => {
  const query = `SELECT * FROM users WHERE username='test'`
  try {
    const result = await pool.query(query);
    return result;
  } catch (err) {
    console.error("Error at test user create: ", err);
    return -1;
  }
}

export const testUserInsertQuery = async() => {
  const query = "INSERT INTO users (username, accountID) VALUES('test', 10)";
  try {
    const result = await pool.query(query);
    console.log("Test user create successfuly");
  } catch (err) {
    console.error("Error at test user create: ", err);
  }

}