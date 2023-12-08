import { getUsersCloud } from "./cloud/db.functions"

export const dbInit = async() => {
  global.cache = {
    users: {}
  }

  // ------- USERS ----------
  const users = await getUsersCloud("all")
  for(const user of users.rows) {
    global.cache.users[user.username] = user
  }
  console.log(global.cache.users)
  console.log("Inicializa cache global")
}

export const dbExists = () => {
  return (global.cache != undefined)
}