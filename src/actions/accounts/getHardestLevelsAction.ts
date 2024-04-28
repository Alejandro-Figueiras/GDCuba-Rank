'use server'
import { getHardestLevels } from '@/database/db.records'

export const getHardestLevelsAction = async (accountid: number) => {
  const result = await getHardestLevels(accountid)
  return JSON.stringify(result)
}
