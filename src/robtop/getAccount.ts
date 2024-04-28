import { gdRequest } from '@/helpers/request-helper'
import responseToObj from '@/helpers/responseToObj'
import RobTopAccount from '@/models/RobTopAccount'

/**
 * Hace una request a los servidores de RobTop usando la id y devuelve un objeto Account con los datos obtenidos
 *
 * Si no hay resultados devuelve -1
 */
export const getAccountByID = async (targetAccountID: number) => {
  if (typeof targetAccountID != 'number')
    throw new Error('Se esperaba un id numerico')
  try {
    const body = await gdRequest('getGJUserInfo20', {
      targetAccountID
    })
    return new RobTopAccount({
      timestamp: new Date().getTime(),
      ...responseToObj(body, ':')
    })
  } catch (err) {
    return -1
  }
}

/**
 * Hace una request a los servidores de RobTop usando el usuario, luego hace otra con la id para obtener los datos completos, y posteriormente devuelve un objeto Account con los datos obtenidos
 *
 * Si no hay resultados devuelve -1
 *
 * **IMPORTANTE:** Siempre que sea posible usar la función `getAccountByID`
 */
export const getAccount = async (target: string) => {
  try {
    const body = await gdRequest('getGJUsers20', { str: target })
    let accountid = parseInt(responseToObj(body, ':')[16]) // AccountID
    return await getAccountByID(accountid)
  } catch (err) {
    return -1
  }
}
