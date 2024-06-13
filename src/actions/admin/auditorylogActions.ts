'use server'

import { getLatestLogs, getLogs } from '@/database/db.auditorylog'
import { authorize } from '@/libs/secure'

export const getLatestAction = async () => {
  const authResult = await authorize()
  if (!authResult.can) return '[]'
  return JSON.stringify(await getLatestLogs(100))
}

export const getLogsAction = async (offset: number) => {
  const authResult = await authorize()
  if (!authResult.can) return '[]'
  return JSON.stringify(await getLogs(50, offset))
}
