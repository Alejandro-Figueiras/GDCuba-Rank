'use server'
import { authorize } from "@/libs/secure";
import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache';
import { renameUserInRecords } from "./db.records";
import { deleteStuffItemsByUsername, renameUserInStuffItems } from "./db.accstuffitems";
import { updateAccountStuff } from "./db.gdaccounts";
import { addLog } from "./db.auditorylog";

/**
 * Esta función agrega un usuario a la base de datos. Los parametros faltantes se ponen por default en la base de datos.
 * @async
 * @param {Object} { user, password, phone, accountid }
 * @returns {Object} 
 */
export const addUser = async({ user, password, phone, accountid }) => {
  noStore()
  const result = await sql`INSERT INTO users(username, password, phone, accountid) VALUES(${user}, ${password}, ${phone}, ${accountid})`;
  if (!result) {
    throw result
  } else {
    return (await sql`SELECT * from users WHERE accountid = ${accountid}`).rows[0];
  }
}

/**
 * Esta función retorna un usuario directamente de la base de datos online
 * @async
 * @param {Object} { user }
 * @returns {Object}
 */
export const getUser = async({user}) => {
  noStore();
  return (await sql`SELECT * from users WHERE username = ${user}`).rows[0];
}

export const getUserByAccountID = async({accountid}) => {
  noStore();
  return (await sql`SELECT * from users WHERE accountid = ${accountid}`).rows[0];
}

/**
 * Esta función es igual a la función getUser pero no tiene en cuenta las mayusculas y minusculas, retorna datos del usuario directamente de la base de datos online.
 * @async
 * @param {Object} { user }
 * @returns 
 */
export const findUser = async({user = ""}) => {
  noStore();
  const result = await sql`SELECT * from users WHERE username ILIKE ${user}`
  if (result.rowCount) return result.rows[0]
  return undefined;
}

/**
 * Esta función retorna todos los usuarios directamente de la base de datos online. Puede ser muy lenta asi que evitar su uso repetitivo
 * @async
 * @returns {Array}
 */
export const getAllUsers = async() => {
  noStore();
  return (await sql`SELECT * from users`).rows
}

export const getUnverifiedUsers = async() => {
  noStore();
  return (await sql`SELECT * from users WHERE status = 'u'`).rows
}

/**
 * Esta función verifica el usuario dentro del sitio. Cambia el status de 'u' a 'v'. También puede actuar de invalidador cuando se le pasa el parametro `unvalidate: true`
 * @async
 * @param {Object} { user, unvalidate? }
 * @returns {Object} user object, si falla se debe manejar el catch de la promesa
 */
export const validateUser = async({user, unvalidate = false}) => {
  noStore()
  const result = await sql`UPDATE users SET status = ${unvalidate? 'u' : 'v'} WHERE username = ${user}`;
  if (!result) throw new Error('Error al validar ' + result)
  return 1;
}

export const changeUserRole = async({user, role = "user"}) => {
  noStore()
  const result = await sql`UPDATE users SET role = ${role} WHERE username = ${user}`;
  if (!result) throw new Error('Error al cambiar el rol ' + result)
  return 1;
}

export const banUser = async({user}) => {
  noStore()
  const accInfo = await getUser({user})
  const authResult = await authorize({owner: (accInfo && accInfo.role != 'user')})
  if (!authResult.can) return undefined;
  const result = await sql`UPDATE users SET status = ${'b'} WHERE username = ${user}`;
  if (result.rowCount > 0) {
    // Removing stuff items
    const removeAccOrder = await updateAccountStuff({username: user, stuff: ''});
    if (removeAccOrder) await deleteStuffItemsByUsername(user);
    await addLog(`${authResult.username} baneó a ${user}`)
  }
  if (!result) throw new Error('Error al banear ' + result)
  return 1;
}

/**
 * Elimina el usuario de la base de datos sin dejar rastro de él.
 * @async
 * @param {Object} { username }
 * @returns {Number} 1 si se eliminó exitosamente, 0 si no encontró resultados, undefined si no tiene permisos
 */
export const eliminarUser = async({username}) => {
  noStore()
  if (!username) return undefined;
  const result = await sql`DELETE FROM users WHERE username = ${username} `;
  if (result) {
    let response = 1;
    if (result.rowCount == 0)
      response = 0;
    
    console.log(`User ${username} removed`);
    return response;
  }
  return undefined;
}

export const setUserPassword = async({username, password}) => {
  noStore()
  const result = await sql`UPDATE users SET password = ${password} WHERE username = ${username} `;
  if (!result) throw new Error('Error al cambiar password: ' + result)
  return 1;
}

export const renameUser = async({accountid, username}) => {
  noStore();
  const result = await sql`UPDATE users SET username = ${username} WHERE accountid = ${accountid}`;
  if (result.rowCount) {
    await renameUserInRecords({accountid, username})
    await renameUserInStuffItems({accountid, username})
  }
  console.log(`Renombrada cuenta ${username} \#${accountid}`)
  return result.rowCount
}