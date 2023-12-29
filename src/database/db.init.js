'use server'
import { getAllAccounts, getUsersCloud } from "./cloud/db.functions"

export const dbInit = async() => {
  if (process.env.CACHE_LOCAL == 0) {
    global.cache = {accUpdateLimit: 0} // Provisional
    return;
  }
  try {
    global.cache = {
      users: {},
      usersLowercase: {},
      gdaccounts: {},
      accUpdateLimit: 0,
    }
  
    // ------- USERS ----------
    const users = await getUsersCloud("all")
    for(const user of users) {
      global.cache.users[user.username] = user
      global.cache.usersLowercase[user.username.toLowerCase()] = user.username
    }
    
    // ------- ACCOUNTS -----------
    const accounts = await getAllAccounts();
    for(const acc of accounts) {
      global.cache.gdaccounts[acc.username] = acc;
    }
    console.log(global.cache)
    console.log("Inicializa cache global")
    return true
  } catch(e) {
    dbClear();
    throw e;
  }
}

export const dbExists = () => {
  if (process.env.CACHE_LOCAL == 0) return true
  return (global.cache != undefined)
}

export const dbClear = () => {
  return global.cache = undefined
}