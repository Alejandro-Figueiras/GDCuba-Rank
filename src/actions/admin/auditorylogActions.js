'use server'

import { getLatestLogs } from "@/database/db.auditorylog"
import { authorize } from "@/libs/secure"

export const getLatestAction = async() => {
  const authResult = await authorize()
  if (!authResult.can) return '[]'
  return JSON.stringify(await getLatestLogs(100))
}