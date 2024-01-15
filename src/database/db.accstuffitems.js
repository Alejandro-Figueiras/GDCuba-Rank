import { sql } from '@vercel/postgres'

export const getAllStuffItems = async({username, accountid}) => {
  let result;
  if (accountid) {
    result = await sql`SELECT * FROM accstuffitems WHERE accountid=${accountid}`
  } else {
    result = await sql`SELECT * FROM accstuffitems WHERE username=${username}`
  }
  return (result.rowCount)?result.rows:[]
}

export const addStuffItem = async(item = {}) => {
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
    const result = await sql`SELECT id FROM accstuffitems WHERE accountid=${item.accountid} ORDER BY id DESC LIMIT 1`
    return result.rows[0]
  }
  return -1
}