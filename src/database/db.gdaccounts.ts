'use server'

import { addAccountCloud, updateAccountCloud } from './db.gdaccounts.functions'
import { kv } from '@vercel/kv'
import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'
import { updateLandingStatsAcc } from './db.staticInfo'
import { changeCubanInRecords, removeRecordsByUsername } from './db.records'
import { eliminarUser } from './db.users'
import type RobTopAccount from '@/models/RobTopAccount'
import { type Account } from '@/models/Account'
/**
 * Agrega una cuenta de GD a la base de datos, y especifica si es cubano o no.
 */
export const addGDAccount = async ({
  account,
  cuba = 0
}: {
  account: RobTopAccount
  cuba?: number
}) => {
  const response = await addAccountCloud(account, cuba)
  if (!response.rowCount) {
    throw response
  } else return account
}

/**
 * Retorna todas las cuentas de GD que hay en la base de datos
 */
export const getAllGDAccounts = async () => {
  noStore()
  return (await sql`SELECT * FROM gdaccounts`).rows as Account[]
}

/**
 * Retorna la cuenta que coincide con el username
 */
export const getGDAccount = async (username: string) => {
  noStore()
  const result =
    await sql`SELECT * FROM gdaccounts WHERE username = ${username}`
  if (result.rowCount) {
    return result.rows[0] as Account
  } else {
    return undefined
  }
}

/**
 * Retorna todas las cuentas de cubanos en la base de datos
 */
export const getAllCubans = async () => {
  noStore()
  const result = await sql`SELECT * FROM gdaccounts WHERE cuba=1`
  return result.rows as Account[]
}

export const changeCuban = async (username: string, cuba: number) => {
  noStore()
  const result =
    await sql`UPDATE gdaccounts SET cuba=${cuba} WHERE username=${username}`
  const rowCount = result.rowCount
  await changeCubanInRecords(username, cuba)
  return rowCount ? true : false
}

export const removeGDAccount = async (username: string) => {
  noStore()
  const result = await sql`DELETE FROM gdaccounts WHERE username=${username} `
  if (result.rowCount) {
    await removeRecordsByUsername(username)
    await eliminarUser({ username })
  }
  return result.rowCount ? 1 : 0
}

/**
 * Primero consulta si se puede actualizar por el limite de tiempo. Si no es posible, retorna vacío, si lo es actualiza el numero de cuentas especificado más viejas que hallan en la base de datos.
 
 * - limit es Limite de Cuentas a Actualizar. 
 * - timeLimit: Limite de tiempo entre actualizaciones
 */
export const updateAccounts = async ({ limit = 3, timeLimit = 60000 }) => {
  noStore()
  // Comprueba el timestamp
  const timestamp = new Date().getTime()
  const oldTS = (await kv.get('accUpdateLimit')) as number
  if (timeLimit && timestamp - oldTS < timeLimit) return -2
  await kv.set('accUpdateLimit', timestamp)

  console.log('DATABASE: actualizando accounts')
  // Pregunta las cuentas con la información más antigua
  const result = (
    await sql`SELECT accountid,username FROM gdaccounts ORDER BY timestamp ASC LIMIT ${limit} `
  ).rows

  if (result) {
    // Request a los servidores de Rob
    for (const acc of result) {
      await updateAccountCloud(acc.accountid, acc.username)
    }

    // Actualizando Timestamp
    const timestamp = new Date().getTime()
    await kv.set('accUpdateLimit', timestamp)

    await updateLandingStatsAcc()
    console.log('DATABASE: actualizando accounts completado')
    return 1
  } else {
    console.error('Error at updateAccounts: ', result)
    return -1
  }
}

/**
 * Actualiza los datos del stuff de una cuenta, tenga en cuenta que no hace una validación, dicha debe hacerse antes de llamar a esta función
 * @async
 * @param {{username, stuff}}
 * @returns 1 si todo anduvo bien. 0 si no se actualiza
 */
export const updateAccountStuff = async ({
  username,
  stuff = ''
}: {
  username: string
  stuff?: string
}) => {
  const result =
    await sql`UPDATE gdaccounts SET stuff = ${stuff} WHERE username=${username} `
  return result.rowCount ? 1 : 0
}
