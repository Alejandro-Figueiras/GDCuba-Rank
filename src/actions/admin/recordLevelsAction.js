'use server'

import { getAllLevelsByDifficulty } from "@/database/db.records";
import { authorize } from "@/libs/secure"

export const getAllLevelsByDifficultyAction = async({difficulty = 15}) => {
  if (await authorize()) {
    return JSON.stringify(await getAllLevelsByDifficulty({difficulty}))
  }
  return '[]';
}