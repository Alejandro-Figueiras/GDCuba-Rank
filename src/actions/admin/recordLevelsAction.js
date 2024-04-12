'use server'

import { getAllLevelsByDifficulty, reposicionarNivel } from "@/database/db.records";
import { updateLandingStatsRecords } from "@/database/db.staticInfo";
import { authorize } from "@/libs/secure"

export const getAllLevelsByDifficultyAction = async({difficulty = 15}) => {
  if ((await authorize()).can) {
    return JSON.stringify(await getAllLevelsByDifficulty({difficulty}))
  }
  return '[]';
}

export const reposicionarLevelAction = async({levelid, oldScore, newScore, platformer}) => {
  if ((await authorize()).can) {
    const result = await reposicionarNivel(levelid, oldScore, newScore, platformer)
    await updateLandingStatsRecords()
    return result
  }
  return 0;
}