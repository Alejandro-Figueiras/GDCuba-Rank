'use server'
import { type Record } from '@/models/Record'
import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

export const addRecord = async (record: {
  accountid: number
  username: string
  levelname: string
  levelid: number
  difficulty: number
  featured: string
  aval?: number
  percent: number
  video?: string
  cuba: number
  platformer: boolean
}) => {
  noStore()
  let { difficulty: dbDifficulty, difficultyscore } =
    await getDifficultyFromLevel({
      levelid: record.levelid
    })
  if (dbDifficulty != record.difficulty) difficultyscore = 0 //
  if (!record.aval) record.aval = 0
  if (!record.video) record.video = ''
  if (!record.cuba) record.cuba = 0

  /*
  Se pueden dar los siguientes casos
  1. Que el usuario no tenga ningun record en el nivel y este sea el primero
  2. Que el usuario tenga algun record en el nivel, en ese caso se actualizará si es mayor, sino se le notificará
  */
  const queryResult =
    await sql`SELECT id,percent FROM records WHERE levelid=${record.levelid} AND accountid=${record.accountid} `
  if (queryResult.rowCount) {
    console.log('Ya existe')
    const oldPercent = queryResult.rows[0].percent
    const recordID = queryResult.rows[0].id
    if (record.percent > oldPercent) {
      const result = await sql`UPDATE records SET
      percent=${record.percent},
      aval=${record.aval ? record.aval : -2},
      video=${record.video}
      WHERE id=${recordID}
      `
      return result.rowCount ? 2 : -1
    }
    return -2
  }

  const result = await sql`INSERT INTO records(
    accountid,
    username,
    levelname,
    levelid,
    percent,
    aval,
    video,
    difficulty,
    featured,
    difficultyscore,
    cuba,
    platformer
  ) VALUES(
    ${record.accountid},
    ${record.username},
    ${record.levelname},
    ${record.levelid},
    ${record.percent},
    ${record.aval},
    ${record.video},
    ${record.difficulty},
    ${record.featured},
    ${difficultyscore},
    ${record.cuba},
    ${record.platformer ? 1 : 0}
  )`

  return result.rowCount ? 1 : -1
}

export const getRecordByID = async ({ id }: { id: number }) => {
  noStore()
  const result = await sql`SELECT * FROM records WHERE id=${id} LIMIT 1 `
  return result.rowCount ? result.rows[0] : undefined
}

export const getDifficultyFromLevel = async ({
  levelid
}: {
  levelid: number
}) => {
  noStore()
  const result =
    await sql`SELECT difficulty, difficultyscore FROM records WHERE levelid=${levelid} `
  return result.rowCount
    ? result.rows[0]
    : { difficulty: null, difficultyscore: 0 }
}

export const getAllRecords = async () => {
  noStore()
  const result = await sql`SELECT * FROM records`
  return result.rowCount ? (result.rows as Record[]) : []
}

export const getAllCubanRecords = async () => {
  noStore()
  const result = await sql`SELECT * FROM records WHERE cuba = 1`
  return result.rowCount ? (result.rows as Record[]) : []
}

export const getUnverifiedRecords = async () => {
  noStore()
  const result = await sql`SELECT * FROM records WHERE aval = 0 OR aval = -2`
  return result.rowCount ? (result.rows as Record[]) : []
}

export const getAllCubanExtremesVerified = async () => {
  noStore()
  const result =
    await sql`SELECT * FROM records WHERE difficulty = 15 AND percent = 100 AND aval = 1 AND cuba = 1`
  return result.rowCount ? (result.rows as Record[]) : []
}

export const getAllCubanExtremesVerifiedTradicional = async () => {
  noStore()
  const result =
    await sql`SELECT * FROM records WHERE difficulty = 15 AND percent = 100 AND aval = 1 AND cuba = 1 AND platformer = 0`
  return result.rowCount ? (result.rows as Record[]) : []
}

export const getAllCubanExtremesVerifiedPlatformer = async () => {
  noStore()
  const result =
    await sql`SELECT * FROM records WHERE difficulty = 15 AND percent = 100 AND aval = 1 AND cuba = 1 AND platformer = 1`
  return result.rowCount ? (result.rows as Record[]) : []
}

export const getAllCubanInsaneDemonsVerified = async () => {
  noStore()
  const result =
    await sql`SELECT * FROM records WHERE difficulty = 14 AND percent = 100 AND aval = 1 AND cuba = 1`
  return result.rowCount ? (result.rows as Record[]) : []
}

export const getAllRecordsUser = async (username: string) => {
  noStore()
  const result = await sql`SELECT * FROM records WHERE username = ${username}`
  return result.rowCount ? (result.rows as Record[]) : []
}

export const getAllLevelsByDifficulty = async ({ difficulty = 15 }) => {
  noStore()
  const result =
    await sql`SELECT levelid, levelname, difficulty, difficultyscore, featured, platformer FROM records WHERE difficulty = ${difficulty}`
  return result.rowCount ? (result.rows as Record[]) : []
}

export const getHardestLevels = async (accountid: number) => {
  noStore()
  const result =
    await sql`SELECT * FROM records WHERE accountid = ${accountid} AND aval = 1 ORDER BY difficulty DESC, percent DESC, difficultyscore DESC LIMIT 6`
  return result.rowCount ? (result.rows as Record[]) : []
}

export const reposicionarNivel = async (
  levelid = -1,
  oldScore = 0,
  newScore = 1,
  platformer = false
) => {
  noStore()
  if (oldScore == 0) {
    const updateRowsResult =
      await sql`UPDATE records SET difficultyscore = difficultyscore + 1 WHERE platformer = ${platformer ? 1 : 0} AND difficultyscore >= ${newScore}`
  } else if (oldScore < newScore) {
    const updateRowsResult =
      await sql`UPDATE records SET difficultyscore = difficultyscore - 1 WHERE platformer = ${platformer ? 1 : 0} AND difficultyscore > ${oldScore} AND difficultyscore <= ${newScore}`
  } else {
    const updateRowsResult =
      await sql`UPDATE records SET difficultyscore = difficultyscore + 1 WHERE platformer = ${platformer ? 1 : 0} AND difficultyscore < ${oldScore} AND difficultyscore >= ${newScore}`
  }
  const updateLevel =
    await sql`UPDATE records SET difficultyscore = ${newScore} WHERE levelid = ${levelid}`
  return updateLevel.rowCount
}

export const renameUserInRecords = async ({
  accountid,
  username
}: {
  accountid: number
  username: string
}) => {
  noStore()
  return (
    await sql`UPDATE records SET username = ${username} WHERE accountid = ${accountid}`
  ).rowCount
}

export const removeRecordsByUsername = async (username: string) => {
  noStore()
  return (await sql`DELETE FROM records WHERE username = ${username}`).rowCount
}

export const changeCubanInRecords = async (username: string, cuba = 0) => {
  noStore()
  return (
    await sql`UPDATE records SET cuba = ${cuba} WHERE username = ${username}`
  ).rowCount
}
