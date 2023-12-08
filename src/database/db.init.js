import { getUsersCloud } from "./cloud/db.functions"
import { addUser } from "./db.users"

export const dbInit = async() => {
  global.cache = {
    users: {}
  }

  // ------- USERS ----------
  const users = await getUsersCloud("all")
  for(const user of users.rows) {
    global.cache.users[user.username] = user
  }

  addUser({user: "SrMDK", password: "12345", phone: "12345", accountID: "12345"})
  console.log(global.cache.users)
  console.log("Inicializa cache global")
}

export const dbExists = () => {
  return (global.cache != undefined)
}