'use server'

import { getAllLevelsByDifficulty, reposicionarNivel } from "@/database/db.records";
import { authorize } from "@/libs/secure"

export const getAllLevelsByDifficultyAction = async({difficulty = 15}) => {
  if (await authorize()) {
    return JSON.stringify(await getAllLevelsByDifficulty({difficulty}))
  }
  return '[]';
}

export const reposicionarLevelAction = async({levelid, oldScore, newScore}) => {
  if (await authorize()) {
    return await reposicionarNivel(levelid, oldScore, newScore)
  }
  return 0;
}