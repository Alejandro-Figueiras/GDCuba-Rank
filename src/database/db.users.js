'use server'
import { authorize } from "@/libs/secure";
import { sql } from '@vercel/postgres'

/**
 * Esta función agrega un usuario a la base de datos y posteriormente lo descarga a la cache local.
 * @async
 * @param {Object} { user, password, phone, accountID }
 * @returns {Object} 
 */
export const addUser = async({ user, password, phone, accountid }) => {
  const result = await sql`INSERT INTO users(username, password, phone, accountid) VALUES(${user}, ${password}, ${phone}, ${accountid})`;
  if (!result) {
    throw result
  } else {
    return (await sql`SELECT * from users WHERE accountid = ${accountid}`).rows[0];
  }
}

/**
 * Esta función retorna un usuario directamente de la cache local, nunca toca la base de datos online
 * @async
 * @param {Object} { user }
 * @returns {Object}
 */
export const getUser = async({user}) => {
  return (await sql`SELECT * from users WHERE username = ${user}`).rows[0];
}

/**
 * Esta función es igual a la función getUser pero no tiene en cuenta las mayusculas y minusculas, retorna datos del usuario directamente de la cache local, nunca toca la base de datos online
 * @async
 * @param {Object} { user }
 * @returns 
 */
export const findUser = async({user = ""}) => {
  const result = await sql`SELECT * from users WHERE username ILIKE ${user}`
  if (result.rowCount) return result.rows[0]
  return undefined;
}

/**
 * Esta función retorna todos los usuarios directamente de la cache local, nunca toca la base de datos online
 * @async
 * @returns {Array}
 */
export const getAllUsers = async() => {
  return (await sql`SELECT * from users`).rows
}

/**
 * Esta función verifica el usuario dentro del sitio. Lo actualiza primero en la nube y luego en la cache local
 * @async
 * @param {Object} { user }
 * @returns {Object} user object, si falla se debe manejar el catch de la promesa
 */
export const validateUser = async({user, unvalidate = false}) => {
  if (!(await authorize())) return undefined;
  const result = await sql`UPDATE users SET status = '${unvalidate? 'u' : 'v'}' WHERE username = ${user}`;
  if (!result) throw new Error('Error al validar' + result)
  return 1;
}

export const eliminarUser = async({username}) => {
  const auth = await authorize();
  if (auth) {
    if (!username) return undefined;
    const result = await sql`DELETE FROM users WHERE username = ${username}`;
    if (result) {
      let response = 1;
      if (result.rowCount != 0)
        response = 0;
      
      console.log(`User ${username} removed`);
      return response;
    }
    return undefined;
  }
  throw new Error("Unauthorized")
}