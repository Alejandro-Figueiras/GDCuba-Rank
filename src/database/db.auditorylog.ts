import type LogMessage from '@/models/LogMessage'
import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

export const getLatestLogs = async (cantidad: number) => {
  noStore()
  return (
    await sql`SELECT * FROM auditorylog ORDER BY id DESC LIMIT ${cantidad}`
  ).rows as LogMessage[]
}

export const addLog = async (message: string) => {
  noStore()
  return (await sql`INSERT INTO auditorylog (message) VALUES(${message})`).rows
}
