'use server'

import { parseDifficulty } from "@/helpers/levelParser"
import { authMe } from "../auth/me"
import { addRecord } from "@/database/db.records"
import { getGDAccount } from "@/database/db.gdaccounts"

export const submitRecord = async(datos = {}, level = {}) => {
  const difficulty = parseDifficulty(level)
  const auth = JSON.parse(await authMe({forceRevalidate: true}));
  if (auth.status == 401) return JSON.stringify(auth)
  const acc = await getGDAccount(auth.username)
  const record = {
    accountid: acc.accountid,
    username: acc.username,
    cuba: acc.cuba,
    levelname: level.levelname,
    levelid: level.id,
    percent: datos.percent,
    video: datos.video,
    difficulty: difficulty.difficultyNumber,
    featured: difficulty.featured
  }
  const dbResult = await addRecord(record)
  return dbResult
}

