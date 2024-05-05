'use server'

import { parseDifficulty } from '@/helpers/levelParser'
import { addRecord } from '@/database/db.records'
import { authorize } from '@/libs/secure'
import { addLog } from '@/database/db.auditorylog'
import type Level from '@/models/Level'

export const submitRecordAdminAction = async (
  datos: {
    accountid: number
    username: string
    cuba: number
    percent: number
    video?: string
  },
  level: Level
) => {
  const difficulty = parseDifficulty(level)
  const authResult = await authorize()
  if (!authResult.can) return 401
  const record = {
    accountid: datos.accountid,
    username: datos.username,
    cuba: datos.cuba,
    levelname: level.levelname,
    levelid: level.id,
    percent: datos.percent,
    video: datos.video,
    aval: 1,
    difficulty: difficulty.difficultyNumber,
    featured: difficulty.featured,
    platformer: level.platformer
  }
  const dbResult = await addRecord(record)
  if (dbResult)
    await addLog(
      `${authResult.username} agregó el record de ${level.levelname} ${datos.percent}% para ${datos.username}`
    )
  return dbResult
}
