'use server'
import { changeCuban, removeGDAccount } from "@/database/db.gdaccounts"
import { updateLandingStatsAcc } from "@/database/db.staticInfo"
import { authorize } from "@/libs/secure"

export const changeCubanAction = async({username, cuba}) => {
  if (await authorize()) {
    const result = await changeCuban(username, cuba)
    updateLandingStatsAcc();
    return result
  }
  return 0
}

export const removeGDAccountAction = async({username}) => {
  if (await authorize()) {
    const result = await removeGDAccount(username)
    updateLandingStatsAcc();
    return result
  }
  return 0
}