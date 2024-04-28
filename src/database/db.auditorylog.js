import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

export const getLatestLogs = async (cantidad) => {
  noStore()
  return (
    await sql`SELECT * FROM auditorylog ORDER BY id DESC LIMIT ${cantidad}`
  ).rows
}

export const addLog = async (message) => {
  noStore()
  return (await sql`INSERT INTO auditorylog (message) VALUES(${message})`).rows
}
