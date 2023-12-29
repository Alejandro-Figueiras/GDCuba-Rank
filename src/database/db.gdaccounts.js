'use server'

import { addAccountCloud, getAllCubansAccounts, getGDAccountCloud, getOlderAccountsInfo, updateAccountCloud } from "./cloud/db.functions";

const LOCAL = process.env.CACHE_LOCAL == 1;

export const addGDAccount = async({account, cuba = 0}) => {
  const response = await addAccountCloud(account, cuba);
  if (!response) {
    throw response
  } else {
    if (LOCAL) {
      global.cache.gdaccounts[account.username] = account
    }
    return account
  }
}

export const getGDAccount = async(username) => {
  if (LOCAL) {
    return global.cache.gdaccounts[username]
  } else {
    return await getGDAccountCloud(username)
  }
}

export const getAllCubans = async({toString = false}) => {
  // TODO to server action
  let values = [];
  if (LOCAL) {
    values = Object.values(global.cache.gdaccounts);
  } else {
    values = await getAllCubansAccounts();
  }
  return toString ? JSON.stringify(values) : values
}

export const updateAccounts = async({limit= 3, timeLimit = 60000}) => {
  // Comprueba el timestamp
  const timestamp = new Date().getTime()
  if (global.cache) {
    if (timeLimit && timestamp-global.cache.accUpdateLimit<timeLimit) return
    global.cache.accUpdateLimit = timestamp;
  } else {
    // Bug de vercel
    global.cache = {accUpdateLimit: timestamp}
  }
  
  console.log("DATABASE: actualizando accounts")
  // Pregunta las cuentas con la información más antigua
  const result = await getOlderAccountsInfo({limit})
  if (!result) {
    // Request a los servidores de Rob
    for (const acc of result) {
      await updateAccountCloud(acc.accountid)
    }

    // Actualizando Timestamp
    const timestamp = new Date().getTime()
    if (global.cache)
      global.cache.accUpdateLimit = timestamp;
    else {
      // Bug de Vercel X2
      global.cache = {accUpdateLimit: timestamp}
    }

    console.log("DATABASE: actualizando accounts completado")

  } else {
    console.error("Error at getStarsRank: ", result.error);
    return -1;
  }
}