'use server'

import { addAccountCloud, getOlderAccountsInfo, updateAccountCloud } from "./cloud/db.functions";

export const addGDAccount = async({account, cuba = 0}) => {
  const response = await addAccountCloud(account, cuba);
  if (!response) {
    throw response
  } else {
    return global.cache.gdaccounts[account.username] = account
  }
}

export const getGDAccount = async(username) => {
  return global.cache.gdaccounts[username]
}

export const getAllCubans = async({toString = false}) => {
  const values = Object.values(global.cache.gdaccounts);
  return toString ? JSON.stringify(values) : values
}

export const updateAccounts = async({limit= 3, timeLimit = 60000}) => {
  // Comprueba el timestamp
  const timestamp = new Date().getTime()
  if (timeLimit && timestamp-global.cache.accUpdateLimit<timeLimit) return
  global.cache.accUpdateLimit = timestamp;
  
  console.log("DATABASE: actualizando accounts")
  // Pregunta las cuentas con la información más antigua
  const result = await getOlderAccountsInfo({limit})
  if (!result) {
    // Request a los servidores de Rob
    for (const acc of result.rows) {
      await updateAccountCloud(acc.accountid)
    }

    // Actualizando Timestamp
    const timestamp = new Date().getTime()
    global.cache.accUpdateLimit = timestamp;

    console.log("DATABASE: actualizando accounts completado")

  } else {
    console.error("Error at getStarsRank: ", result.error);
    return -1;
  }
}