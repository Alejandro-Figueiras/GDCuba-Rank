'use server'
import { authorize } from "@/libs/secure";
import { addUserCloud, getUsersCloud, removeUserCloud, validateUserCloud } from "./cloud/db.functions"

const LOCAL = process.env.CACHE_LOCAL == 1;

/**
 * Esta función agrega un usuario a la base de datos y posteriormente lo descarga a la cache local.
 * @async
 * @param {Object} { user, password, phone, accountID }
 * @returns {Object} 
 */
export const addUser = async({ user, password, phone, accountid }) => {
  const response = await addUserCloud({ user, password, phone, accountid });
  if (!response) {
    throw response
  } else {
    const account = (await getUsersCloud(accountid)).rows[0]
    if (LOCAL) global.cache.users[user] = account
    return account
  }
}

/**
 * Esta función retorna un usuario directamente de la cache local, nunca toca la base de datos online
 * @async
 * @param {Object} { user }
 * @returns {Object}
 */
export const getUser = async({user}) => {
  if (LOCAL) {
    return global.cache.users[user]
  } else {
    return await getUsersCloud(user)
  }
}

/**
 * Esta función es igual a la función getUser pero no tiene en cuenta las mayusculas y minusculas, retorna datos del usuario directamente de la cache local, nunca toca la base de datos online
 * @async
 * @param {Object} { user }
 * @returns 
 */
export const findUser = async({user = ""}) => {
  const username = global.cache.usersLowercase[user.toLowerCase()]
  if (username) {
    return global.cache.users[username]
  }

  return undefined;
}

/**
 * Esta función retorna todos los usuarios directamente de la cache local, nunca toca la base de datos online
 * @async
 * @returns {Array}
 */
export const getAllUsers = async() => {
  if (LOCAL) {
    return global.cache.users
  } else {
    return await getUsersCloud('all')
  }
}

/**
 * Esta función verifica el usuario dentro del sitio. Lo actualiza primero en la nube y luego en la cache local
 * @async
 * @param {Object} { user }
 * @returns {Object} user object, si falla se debe manejar el catch de la promesa
 */
export const validateUser = async({user, unvalidate = false}) => {
  if (!(await authorize())) return undefined;
  const result = await validateUserCloud(user, unvalidate);
  if (!result) throw new Error('Error al validar' + result)
  if (LOCAL) {
    global.cache.users[user].status = (!unvalidate) ? 'v' : 'u'
  }
  return 1;
}

export const eliminarUser = async({username}) => {
  const auth = await authorize();
  if (auth) {
    if (!username) return undefined;
    const result = await removeUserCloud(username);
    if (result) {
      let response = 1;
      if (LOCAL) {
        global.cache.users[username] = undefined;
      }
      if (result.rowCount != 0)
        response = 0;
      
      console.log(`User ${username} removed`);
      return response;
    }
    return undefined;
  }
  throw new Error("Unauthorized")
}