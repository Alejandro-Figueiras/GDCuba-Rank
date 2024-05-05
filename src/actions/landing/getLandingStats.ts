'use server'
import { getLandingStats } from '@/database/db.staticInfo'

export const getLandingStatsAction = async () => {
  return JSON.stringify(await getLandingStats())
}
