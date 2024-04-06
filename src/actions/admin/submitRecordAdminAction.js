'use server'

import { parseDifficulty } from "@/helpers/levelParser"
import { addRecord } from "@/database/db.records"
import { authorize } from "@/libs/secure"

export const submitRecordAdminAction = async(datos = {}, level = {}) => {
  const difficulty = parseDifficulty(level)
  if (!(await authorize())) return 401;
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
    featured: difficulty.featured
  }

  console.log(record)
  const dbResult = await addRecord(record)
  return dbResult
}

