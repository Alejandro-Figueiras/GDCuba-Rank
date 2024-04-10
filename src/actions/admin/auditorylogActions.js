'use server'

import { getLatestLogs } from "@/database/db.auditorylog"
import { authorize } from "@/libs/secure"

export const getLatestAction = async() => {
  const auth = await authorize()
  if (!auth.can) return '[]'
  return JSON.stringify(await getLatestLogs(100))
}