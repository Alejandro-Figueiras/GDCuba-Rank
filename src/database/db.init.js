'use server'
import { getAllAccounts, getUsersCloud } from "./cloud/db.functions"

export const dbInit = async() => {
  global.cache = {
    users: {},
    usersLowercase: {},
    gdaccounts: {},
    accUpdateLimit: 0,
  }

  // ------- USERS ----------
  const users = await getUsersCloud("all")
  for(const user of users.rows) {
    global.cache.users[user.username] = user
    global.cache.usersLowercase[user.username.toLowerCase()] = user.username
  }
  
  // ------- ACCOUNTS -----------
  const accounts = await getAllAccounts();
  for(const acc of accounts.result.rows) {
    global.cache.gdaccounts[acc.username] = acc;
  }
  console.log(global.cache)
  console.log("Inicializa cache global")
}

export const dbExists = () => {
  return (global.cache != undefined)
}

export const dbClear = () => {
  return global.cache = undefined
}