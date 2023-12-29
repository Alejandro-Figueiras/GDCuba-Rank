'use server'
import { authorize } from "@/libs/secure";
import { addUserCloud, getUsersCloud, removeUserCloud, validateUserCloud } from "./cloud/db.functions"

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
 * Esta función es igual a la función getUser pero no tiene en cuenta las mayusculas y minusculas, retorna datos del usuario directamente de la cache local, nunca toca la base de datos online
 * @param {Object} { user }
 * @returns 
 */
export const findUser = ({user = ""}) => {
  const username = global.cache.usersLowercase[user.toLowerCase()]
  if (username) {
    return global.cache.users[username]
  }

  return undefined;
}

/**
 * Esta función retorna todos los usuarios directamente de la cache local, nunca toca la base de datos online
 * @returns {Array}
 */
export const getAllUsers = () => {
  return global.cache.users
}

/**
 * Esta función verifica el usuario dentro del sitio. Lo actualiza primero en la nube y luego en la cache local
 * @param {Object} { user }
 * @returns {Object} user object, si falla se debe manejar el catch de la promesa
 */
export const validateUser = async({user, unvalidate = false}) => {
  if (!(await authorize())) return undefined;
  const result = await validateUserCloud(user, unvalidate);
  if (!result) throw new Error('Error al validar' + result)
  global.cache.users[user].status = (!unvalidate) ? 'v' : 'u'
  return global.cache.users[user];
}

export const eliminarUser = async({username}) => {
  const auth = await authorize();
  if (auth) {
    if (!username) return undefined;
    const result = await removeUserCloud(username);
    if (result) {
      let response = 1;
      global.cache.users[username] = undefined;
      if (result.rowCount != 0)
        response = 0;
      
      console.log(`User ${username} removed`);
      return response;
    }
    return undefined;
  }
  throw new Error("Unauthorized")
}