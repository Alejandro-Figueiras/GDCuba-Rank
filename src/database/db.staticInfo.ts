'use server'

import { getAllCubans } from './db.gdaccounts'
import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'
import { getAllCubanRecords } from './db.records'
import { type Record } from '@/models/Record'

type LandingStats = {
  totalStars: number
  totalDemons: number
  totalUsercoins: number
  totalCreatorPoints: number
  totalMoons: number
  totalExtremes: number
  hardest: Record
}

const updateDBInfoLandingStats = async (info: LandingStats) => {
  noStore()
  try {
    await sql`UPDATE staticinfo SET value = ${JSON.parse(JSON.stringify(info))} WHERE key='landingstats'`
  } catch (err) {
    console.log(err)
  }
}

export const updateLandingStatsAcc = async ({
  accounts,
  oldData
}: {
  accounts?: any[] // TODO fix this
  oldData?: LandingStats
} = {}) => {
  // Nota: las accounts deben ser cuba=1
  if (!oldData) oldData = await getLandingStats()
  if (!accounts) accounts = await getAllCubans()

  const info: LandingStats = {
    ...oldData,
    totalStars: 0,
    totalDemons: 0,
    totalUsercoins: 0,
    totalCreatorPoints: 0,
    totalMoons: 0
  }

  for (const acc of accounts) {
    if (!acc.cuba) continue
    info.totalStars += acc.stars
    info.totalDemons += acc.demons
    info.totalUsercoins += acc.usercoins
    info.totalCreatorPoints += acc.creatorpoints
    info.totalMoons += acc.moons
  }

  await updateDBInfoLandingStats(info)
}

export const updateLandingStatsRecords = async ({
  oldData,
  records
}: {
  oldData?: LandingStats
  records?: Record[]
} = {}) => {
  if (!oldData) oldData = await getLandingStats()
  if (!records) records = (await getAllCubanRecords()) as Record[] // TODO fix this

  const info: LandingStats = {
    ...oldData,
    totalExtremes: 0
  }

  for (const record of records) {
    if (record.aval != 1 || record.percent != 100 || record.difficulty != 15)
      continue

    // -------------------------------
    // si algun dia cambia la iteración para niveles que sean menos que extreme,
    // poner aqui un if (record.difficulty != 15)
    info.totalExtremes++
    // -------------------------------

    if (record.difficultyscore >= info.hardest.difficultyscore) {
      if (record.levelid == info.hardest.levelid && record.id > info.hardest.id)
        continue
      info.hardest = record
    }
  }

  await updateDBInfoLandingStats(info)
}

export const updateLandingStatsAll = async ({
  accounts,
  records
}: {
  accounts?: any[] // TODO fix this
  records?: Record[]
} = {}) => {
  const oldData = await getLandingStats()
  await updateLandingStatsAcc({ accounts, oldData })
  await updateLandingStatsRecords({ records, oldData })
}

export const getLandingStats = async () => {
  noStore()
  const result = await sql`SELECT * FROM staticinfo WHERE key='landingstats'`
  return result.rows[0].value as LandingStats
}
