import { addUserCloud, getUsersCloud } from "./cloud/db.functions"

/**
 * Esta función agrega un usuario a la base de datos y posteriormente lo descarga a la cache local.
 * @async
 * @param {Object} { user, password, phone, accountID }
 * @returns {Object} 
 */
export const addUser = async({ user, password, phone, accountid }) => {
  const response = await addUserCloud({ user, password, phone, accountid });
  if (response.isError()) {
    throw response.error
  } else {
    return global.cache.users[user] = (await getUsersCloud(accountid)).rows[0]
  }
}

/**
 * Esta función retorna un usuario directamente de la cache local, nunca toca la base de datos online
 * @param {Object} { user }
 * @returns {Object}
 */
export const getUser = ({user}) => {
  return global.cache.users[user]
}

/**
 * Esta función retorna todos los usuarios directamente de la cache local, nunca toca la base de datos online
 * @returns {Array}
 */
export const getAllUsers = () => {
  return global.cache.users
}