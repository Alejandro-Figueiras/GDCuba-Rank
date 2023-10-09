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
