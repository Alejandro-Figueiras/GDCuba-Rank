import DictionaryObject from '@/helpers/DictionaryObject'
import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

export const getAllStuffItems = async ({
  username,
  accountid
}: {
  username?: string
  accountid?: number
}) => {
  noStore()
  let result
  if (accountid) {
    result =
      await sql`SELECT * FROM accstuffitems WHERE accountid = ${accountid}`
  } else {
    result = await sql`SELECT * FROM accstuffitems WHERE username = ${username}`
  }
  return result.rowCount ? result.rows : []
}

export const addStuffItem = async (item: {
  accountid: number
  username: string
  data: string
}) => {
  noStore()
  const result = await sql`INSERT INTO accstuffitems(
    accountid,
    username,
    data
  ) VALUES (
    ${item.accountid},
    ${item.username},
    ${item.data}
  )`
  if (result.rowCount) {
    const result =
      await sql`SELECT id FROM accstuffitems WHERE accountid = ${item.accountid} ORDER BY id DESC LIMIT 1`
    return result.rows[0] as { id: number }
  }
  return -1
}

export const updateStuffItemData = async (id: number, data: string) => {
  noStore()
  const result =
    await sql`UPDATE accstuffitems SET data = ${data} WHERE id = ${id}`
  return result.rowCount ? 1 : 0
}

export const deleteStuffItem = async (id: number) => {
  noStore()
  const result = await sql`DELETE FROM accstuffitems WHERE id = ${id}`
  return result.rowCount ? 1 : 0
}

export const deleteStuffItemsByUsername = async (username: string) => {
  noStore()
  const result =
    await sql`DELETE FROM accstuffitems WHERE username = ${username}`
  return result.rowCount ? 1 : 0
}

export const renameUserInStuffItems = async ({
  accountid,
  username
}: {
  accountid: number
  username: string
}) => {
  noStore()
  return (
    await sql`UPDATE accstuffitems SET username = ${username} WHERE accountid = ${accountid}`
  ).rowCount
}
