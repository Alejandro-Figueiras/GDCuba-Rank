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