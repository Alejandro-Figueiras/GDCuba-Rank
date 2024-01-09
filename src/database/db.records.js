'use server'
import { sql } from '@vercel/postgres'

export const addRecord = async(record = {}) => {
  let { difficulty: dbDifficulty, difficultyscore } = getDifficultyFromLevel({levelid: record.levelid})
  if (dbDifficulty != record.difficulty) difficultyscore = 0;
  if (!record.aval) record.aval=0;

  /*
  Se pueden dar los siguientes casos
  Que el usuario no tenga ningun record en el nivel y este sea el primero
  Que el usuario tenga algun record en el nivel, en ese caso se actualizará si es mayor, sino se le notificará
  */
  const queryResult = await sql`SELECT id,percent FROM records WHERE levelid=${record.levelid} AND accountid=${record.accountid}`
  if (queryResult.rowCount) {
    console.log("Ya existe")
    const oldPercent = queryResult.rows[0].percent;
    const recordID = queryResult.rows[0].id;
    if (record.percent > oldPercent) {
      const result = await sql`UPDATE records SET
      percent=${record.percent},
      aval=${0},
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
    ${difficultyscore}
  )`;
  
  return result.rowCount ? 1 : -1;
}

export const getRecordByID = async({id}) => {
  const result = await sql`SELECT * FROM records WHERE id=${id} LIMIT 1`;
  return result.rowCount?result.rows[0]:undefined;
}

export const getDifficultyFromLevel = async({levelid}) => {
  const result = await sql`SELECT difficulty, difficultyscore FROM records WHERE levelid=${levelid}`;
  return result.rowCount?result.rows[0]:{difficulty: null, difficultyscore: 0};
}