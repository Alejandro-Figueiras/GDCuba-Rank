"use server"
import { getHardestLevels } from "@/database/db.records"

export const getHardestLevelsAction = async(accountid)  => {
  const result = await getHardestLevels(accountid)
  return JSON.stringify(result)
}