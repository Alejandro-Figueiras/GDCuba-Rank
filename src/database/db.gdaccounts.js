'use server'

import { addAccountCloud, updateAccountCloud } from "./db.gdaccounts.functions";
import { kv } from '@vercel/kv'

export const addGDAccount = async({account, cuba = 0}) => {
  const response = await addAccountCloud(account, cuba);
  if (!response) {
    throw response
  } else return account
}

export const getAllGDAccounts = async() => {
  return (await sql`SELECT * FROM gdaccounts`).rows;
}

export const getGDAccount = async(username) => {
  return (await sql`SELECT * FROM gdaccounts WHERE username = ${username}`).rows[0]
}

export const getAllCubans = async({toString = false}) => {
  // TODO to server action
  let values = [];
  const result = await sql`SELECT * FROM gdaccounts WHERE cuba=1`
  values = result.rows
  return toString ? JSON.stringify(values) : values
}

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
    console.error("Error at getStarsRank: ", result.error);
    return -1;
  }
}