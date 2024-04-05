'use server'
import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache';

export const addRecord = async(record = {}) => {
  noStore()
  let { difficulty: dbDifficulty, difficultyscore } = getDifficultyFromLevel({levelid: record.levelid})
  if (dbDifficulty != record.difficulty) difficultyscore = 0;
  if (!record.aval) record.aval=0;

  /*
  Se pueden dar los siguientes casos
  1. Que el usuario no tenga ningun record en el nivel y este sea el primero
  2. Que el usuario tenga algun record en el nivel, en ese caso se actualizará si es mayor, sino se le notificará
  */
  const queryResult = await sql`SELECT id,percent FROM records WHERE levelid=${record.levelid} AND accountid=${record.accountid} `
  if (queryResult.rowCount) {
    console.log("Ya existe")
    const oldPercent = queryResult.rows[0].percent;
    const recordID = queryResult.rows[0].id;
    if (record.percent > oldPercent) {
      const result = await sql`UPDATE records SET
      percent=${record.percent},
      aval=${record.aval?record.aval:-2},
      video=${record.video}
      WHERE id=${recordID}
      `;
      return (result.rowCount)?2:-1;
    }
    return -2;
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
    difficultyscore
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
    ${difficultyscore}
  )`;
  
  return result.rowCount ? 1 : -1;
}

export const getRecordByID = async({id}) => {
  noStore()
  const result = await sql`SELECT * FROM records WHERE id=${id} LIMIT 1 `;
  return result.rowCount?result.rows[0]:undefined;
}

export const getDifficultyFromLevel = async({levelid}) => {
  noStore();
  const result = await sql`SELECT difficulty, difficultyscore FROM records WHERE levelid=${levelid} `;
  return result.rowCount?result.rows[0]:{difficulty: null, difficultyscore: 0};
}

export const getAllRecords = async() => {
  noStore()
  const result = await sql`SELECT * FROM records`;
  return result.rowCount?result.rows:[];
}

export const getUnverifiedRecords = async() => {
  noStore()
  const result = await sql`SELECT * FROM records WHERE aval = 0 OR aval = -2`;
  return result.rowCount?result.rows:[];
}

export const getAllExtremesVerified = async() => {
  noStore();
  const result = await sql`SELECT * FROM records WHERE difficulty = 15 AND percent = 100 AND aval = 1`
  return (result.rowCount)?result.rows:[];
}

export const getAllInsaneDemonsVerified = async() => {
  noStore();
  const result = await sql`SELECT * FROM records WHERE difficulty = 14 AND percent = 100 AND aval = 1`
  return (result.rowCount)?result.rows:[];
}

export const getAllRecordsUser = async(username) => {
  noStore();
  const result = await sql`SELECT * FROM records WHERE username = ${username}`
  return (result.rowCount)?result.rows:[];
}

export const getAllLevelsByDifficulty = async({difficulty = 15}) => {
  noStore();
  const result = await sql`SELECT levelid, levelname, difficulty, difficultyscore, featured FROM records WHERE difficulty = ${difficulty}`
  return (result.rowCount)?result.rows:[];
}

export const getHardestLevels = async(accountid) => {
  noStore();
  const result = await sql`SELECT * FROM records WHERE accountid = ${accountid} AND aval = 1 ORDER BY difficulty DESC, percent DESC, difficultyscore DESC LIMIT 6`
  return (result.rowCount)?result.rows:[];
}

export const reposicionarNivel = async(levelid, oldScore = 0, newScore = 1) => {
  noStore();
  if (oldScore == 0) {
    const updateRowsResult = await sql`UPDATE records SET difficultyscore = difficultyscore + 1 WHERE difficultyscore >= ${newScore}`
  } else if (oldScore < newScore) {
    const updateRowsResult = await sql`UPDATE records SET difficultyscore = difficultyscore - 1 WHERE difficultyscore > ${oldScore} AND difficultyscore <= ${newScore}`
  } else {
    const updateRowsResult = await sql`UPDATE records SET difficultyscore = difficultyscore + 1 WHERE difficultyscore < ${oldScore} AND difficultyscore >= ${newScore}`
  }
  const updateLevel = await sql`UPDATE records SET difficultyscore = ${newScore} WHERE levelid = ${levelid}`
  return updateLevel.rowCount
}

export const renameUserInRecords = async({accountid, username}) => {
  noStore();
  return (await sql`UPDATE records SET username = ${username} WHERE accountid = ${accountid}`).rowCount;
}