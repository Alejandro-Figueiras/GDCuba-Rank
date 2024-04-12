'use server'

import { getAllCubans } from "./db.gdaccounts"
import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache';
import { getAllCubanRecords } from "./db.records";

const updateDBInfoLandingStats = async(info) => {
  noStore();
  try{
    await sql`UPDATE staticinfo SET value = ${info} WHERE key='landingstats'`
  } catch(err) {
    console.log(err)
  }
}

export const updateLandingStatsAcc = async({accounts, oldData} = {}) => {
  // Nota: las accounts deben ser cuba=1
  if (!oldData) oldData = await getLandingStats();
  if (!accounts) accounts = await getAllCubans();

  const info = {
    ...oldData,
    totalStars: 0,
    totalDemons: 0,
    totalUsercoins: 0,
    totalCreatorPoints: 0,
    totalMoons: 0,
  }

  for (const acc of accounts) {
    if (!acc.cuba) continue;
    info.totalStars += acc.stars
    info.totalDemons += acc.demons
    info.totalUsercoins += acc.usercoins
    info.totalCreatorPoints += acc.creatorpoints
    info.totalMoons += acc.moons
  }

  await updateDBInfoLandingStats(info)
}

export const updateLandingStatsRecords = async({oldData, records} = {}) => {;
  if (!oldData) oldData = await getLandingStats();
  if (!records) records = await getAllCubanRecords();

  const info = {
    ...oldData,
    totalExtremes: 0,
    hardest: {
      difficultyscore: 0,
      levelid: 0,
      id: -1
    }
  }

  for (const record of records) {
    if (record.aval != 1 || record.percent != 100 || record.difficulty != 15) continue;

    // -------------------------------
    // si algun dia cambia la iteración para niveles que sean menos que extreme,
    // poner aqui un if (record.difficulty != 15)
    info.totalExtremes++; 
    // -------------------------------

    if (record.difficultyscore >= info.hardest.difficultyscore) {
      if (record.levelid == info.hardest.levelid && record.id > info.hardest.id)  continue;
      info.hardest = record
    }
  }

  await updateDBInfoLandingStats(info)
}

export const updateLandingStatsAll = async({accounts, records} = {}) => {
  const oldData = await getLandingStats();
  await updateLandingStatsAcc({accounts, oldData});
  await updateLandingStatsRecords({records, oldData});
}

export const getLandingStats = async() => {
  noStore();
  const result = await sql`SELECT * FROM staticinfo WHERE key='landingstats'`
  return (result.rowCount)?result.rows[0].value:{}
}