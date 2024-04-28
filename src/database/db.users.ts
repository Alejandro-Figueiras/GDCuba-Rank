'use server'
import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'
import { renameUserInRecords } from './db.records'
import {
  deleteStuffItemsByUsername,
  renameUserInStuffItems
} from './db.accstuffitems'
import { updateAccountStuff } from './db.gdaccounts'
import { type User } from '@/models/User'

/**
 * Esta función agrega un usuario a la base de datos. Los parametros faltantes se ponen por default en la base de datos.
 */
export const addUser = async ({
  user,
  password,
  phone,
  accountid
}: {
  user: string
  password: string
  phone: string
  accountid: number
}) => {
  noStore()
  const result =
    await sql`INSERT INTO users(username, password, phone, accountid) VALUES(${user}, ${password}, ${phone}, ${accountid})`
  if (!result) {
    throw result
  } else {
    return (
      await sql`SELECT id,username,accountid,phone,status,role,sessiontoken from users WHERE accountid = ${accountid}`
    ).rows[0] as User
  }
}

/**
 * Esta función retorna un usuario directamente de la base de datos online
 */
export const getUser = async ({ user }: { user: string }) => {
  noStore()
  return (
    await sql`SELECT id,username,accountid,phone,status,role,sessiontoken from users WHERE username = ${user}`
  ).rows[0] as User
}

export const getUserByAccountID = async ({
  accountid
}: {
  accountid: number
}) => {
  noStore()
  return (
    await sql`SELECT id,username,accountid,phone,status,role,sessiontoken from users WHERE accountid = ${accountid}`
  ).rows[0] as User
}

/**
 * Esta función es igual a la función getUser pero no tiene en cuenta las mayusculas y minusculas, retorna datos del usuario directamente de la base de datos online.
 */
export const findUser = async ({
  user = '',
  password = false
}): Promise<User | undefined> => {
  noStore()
  const result = !password
    ? await sql`SELECT id,username,accountid,phone,status,role,sessiontoken from users WHERE username ILIKE ${user}`
    : await sql`SELECT * from users WHERE username ILIKE ${user}`
  if (result.rowCount) {
    return result.rows[0] as User
  }
  return undefined
}

/**
 * Esta función retorna todos los usuarios directamente de la base de datos online. Puede ser muy lenta asi que evitar su uso repetitivo
 */
export const getAllUsers = async () => {
  noStore()
  return (
    await sql`SELECT id,username,accountid,phone,status,role,sessiontoken from users`
  ).rows as User[]
}

export const getUnverifiedUsers = async () => {
  noStore()
  return (
    await sql`SELECT id,username,accountid,phone,status,role,sessiontoken from users WHERE status = 'u'`
  ).rows as User[]
}

/**
 * Esta función verifica el usuario dentro del sitio. Cambia el status de 'u' a 'v'. También puede actuar de invalidador cuando se le pasa el parametro `unvalidate: true`
 */
export const validateUser = async ({
  user,
  unvalidate = false
}: {
  user: string
  unvalidate?: boolean
}) => {
  noStore()
  const result =
    await sql`UPDATE users SET status = ${unvalidate ? 'u' : 'v'} WHERE username = ${user}`
  if (!result.rowCount) throw new Error('Error al validar ' + result)
  return 1
}

export const changeUserRole = async ({
  user,
  role = 'user'
}: {
  user: string
  role?: string
}) => {
  noStore()
  const result =
    await sql`UPDATE users SET role = ${role} WHERE username = ${user}`
  if (!result) throw new Error('Error al cambiar el rol ' + result)
  return 1
}

export const banUser = async ({ user }: { user: string }) => {
  noStore()
  const result =
    await sql`UPDATE users SET status = ${'b'} WHERE username = ${user}`
  if (result.rowCount > 0) {
    // Removing stuff items
    const removeAccOrder = await updateAccountStuff({
      username: user,
      stuff: ''
    })
    if (removeAccOrder) await deleteStuffItemsByUsername(user)
    return 1
  }
  if (!result) throw new Error('Error al banear ' + result)
  return 0
}

/**
 * Elimina el usuario de la base de datos sin dejar rastro de él.
 * Retorna 1 si se eliminó exitosamente, 0 si no encontró resultados, undefined si no tiene permisos
 */
export const eliminarUser = async ({ username }: { username: string }) => {
  noStore()
  if (!username) return undefined
  const result = await sql`DELETE FROM users WHERE username = ${username} `
  if (result) {
    let response = 1
    if (result.rowCount == 0) response = 0

    console.log(`User ${username} removed`)
    return response
  }
  return undefined
}

export const setUserPassword = async ({
  username,
  password
}: {
  username: string
  password: string
}) => {
  noStore()
  const newSessionToken = Math.floor(Math.random() * 1000000)
  const result =
    await sql`UPDATE users SET password = ${password}, sessiontoken = ${newSessionToken} WHERE username = ${username} `
  if (!result) throw new Error('Error al cambiar password: ' + result)
  return 1
}

export const renameUser = async ({
  accountid,
  username
}: {
  accountid: number
  username: string
}) => {
  noStore()
  const result =
    await sql`UPDATE users SET username = ${username} WHERE accountid = ${accountid}`
  if (result.rowCount) {
    await renameUserInRecords({ accountid, username })
    await renameUserInStuffItems({ accountid, username })
  }
  console.log(`Renombrada cuenta ${username} \#${accountid}`)
  return result.rowCount
}
