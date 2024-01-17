import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache';

export const getAllStuffItems = async({username, accountid}) => {
  noStore();
  let result;
  if (accountid) {
    console.log(accountid)
    result = await sql`SELECT * FROM accstuffitems WHERE accountid = ${accountid}`
  } else {
    result = await sql`SELECT * FROM accstuffitems WHERE username = ${username}`
  }
  return (result.rowCount)?result.rows:[]
}

export const addStuffItem = async(item = {}) => {
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
    const result = await sql`SELECT id FROM accstuffitems WHERE accountid = ${item.accountid} ORDER BY id DESC LIMIT 1`
    return result.rows[0]
  }
  return -1
}