'use server'

import { parseDifficulty } from "@/helpers/levelParser"
import { authMe } from "../auth/me"
import { addRecord } from "@/database/db.records"

export const submitRecord = async(datos = {}, level = {}) => {
  const difficulty = parseDifficulty(level)
  const auth = JSON.parse(await authMe());
  if (auth.status == 401) return JSON.stringify(auth)
  const record = {
    accountid: auth.accountid,
    username: auth.username,
    levelname: level.levelname,
    levelid: level.id,
    percent: datos.percent,
    video: datos.video,
    difficulty: difficulty.difficultyNumber
  }
  const dbResult = await addRecord(record)
  return dbResult
}

