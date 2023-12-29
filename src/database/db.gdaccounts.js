'use server'

import { addAccountCloud, getAllCubansAccounts, getGDAccountCloud, getOlderAccountsInfo, updateAccountCloud } from "./cloud/db.functions";
import { kv } from '@vercel/kv'

export const addGDAccount = async({account, cuba = 0}) => {
  const response = await addAccountCloud(account, cuba);
  if (!response) {
    throw response
  } else return account
}

export const getGDAccount = async(username) => {
  return await getGDAccountCloud(username)
}

export const getAllCubans = async({toString = false}) => {
  // TODO to server action
  let values = [];
  values = await getAllCubansAccounts();
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
  const result = await getOlderAccountsInfo({limit})

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