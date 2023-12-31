'use server'
import { sql } from '@vercel/postgres'

export const getLevelToDB = async({levelID}) => {
  const result = await sql`SELECT * FROM levels WHERE levelid = ${levelID}`;
  return (result && result.rowCount) ? result.rows[0] : undefined;
}