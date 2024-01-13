'use server'

import { addAccountCloud, updateAccountCloud } from "./db.gdaccounts.functions";
import { kv } from '@vercel/kv'
import { sql } from '@vercel/postgres'

/**
 * Agrega una cuenta de GD a la base de datos, y especifica si es cubano o no.
 * @async
 * @param {{ account: Number, cuba: Number }} 
 * @returns {account}
 */
export const addGDAccount = async({account, cuba = 0}) => {
  const response = await addAccountCloud(account, cuba);
  if (!response) {
    throw response
  } else return account
}

/**
 * Retorna todas las cuentas de GD que hay en la base de datos
 * @async
 * @returns Array de Accounts
 */
export const getAllGDAccounts = async() => {
  return (await sql`SELECT * FROM gdaccounts`).rows;
}

/**
 * Retorna la cuenta que coincide con el username
 * @async
 * @param {String} username 
 * @returns Account
 */
export const getGDAccount = async(username) => {
  const result = await sql`SELECT * FROM gdaccounts WHERE username = ${username}`
  if (result.rowCount) {
    return result.rows[0]
  } else {
    return undefined
  }
}

/**
 * Retorna todas las cuentas de cubanos en la base de datos
 * @async
 * @returns Array de Accounts
 */
export const getAllCubans = async() => {
  const result = await sql`SELECT * FROM gdaccounts WHERE cuba=1`
  return result.rows
}

export const changeCuban = async(username, cuba) => {
  const result = await sql`UPDATE gdaccounts SET cuba=${cuba} WHERE username=${username}`
  return result.rowCount?1:0
}

export const removeGDAccount = async(username) => {
  const result = await sql`DELETE FROM gdaccounts WHERE username=${username}`
  return result.rowCount?1:0
}

/**
 * Primero consulta si se puede actualizar por el limite de tiempo. Si no es posible, retorna vacío, si lo es actualiza el numero de cuentas especificado más viejas que hallan en la base de datos.
 * @async
 * @param {{limit: Number, timeLimit: Number}} Object limit es Limite de Cuentas a Actualizar. timeLimit: Limite de tiempo entre actualizaciones
 * @returns 
 */
export const updateAccounts = async({limit= 3, timeLimit = 60000}) => {
  // Comprueba el timestamp
  const timestamp = new Date().getTime()  
  const oldTS = await kv.get('accUpdateLimit');
  if (timeLimit && timestamp-oldTS<timeLimit) return
  await kv.set('accUpdateLimit', timestamp);
  
  console.log("DATABASE: actualizando accounts")
  // Pregunta las cuentas con la información más antigua
  const result = (await sql`SELECT accountid FROM gdaccounts ORDER BY timestamp ASC LIMIT ${limit}`).rows

  if (result) {
    // Request a los servidores de Rob
    for (const acc of result) {
      await updateAccountCloud(acc.accountid)
    }

    // Actualizando Timestamp
    const timestamp = new Date().getTime()
    await kv.set('accUpdateLimit', timestamp);

    console.log("DATABASE: actualizando accounts completado")

  } else {
    console.error("Error at updateAccounts: ", result.error);
    return -1;
  }
}