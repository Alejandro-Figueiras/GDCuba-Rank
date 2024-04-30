'use server'

import { parseDifficulty } from '@/helpers/levelParser'
import { authMe } from '../auth/me'
import { addRecord } from '@/database/db.records'
import { getGDAccount } from '@/database/db.gdaccounts'
import type Level from '@/models/Level'

export const submitRecord = async (
  datos: { percent: number; video?: string },
  level: Level
) => {
  const difficulty = parseDifficulty(level)
  const auth = JSON.parse(await authMe({ forceRevalidate: true }))
  if (auth.status == 401) return JSON.stringify(auth)
  const acc = await getGDAccount(auth.username)
  if (!acc) return -1
  if (!datos.video) datos.video = ''
  const record = {
    accountid: acc.accountid,
    username: acc.username,
    cuba: acc.cuba ? 1 : 0,
    levelname: level.levelname,
    levelid: level.id,
    percent: datos.percent,
    video: datos.video,
    difficulty: difficulty.difficultyNumber,
    featured: difficulty.featured,
    platformer: level.platformer
  }
  const dbResult = await addRecord(record)
  return dbResult
}
