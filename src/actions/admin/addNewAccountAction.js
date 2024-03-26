'use server'
import { addGDAccount } from "@/database/db.gdaccounts"
import { updateLandingStatsAcc } from "@/database/db.staticInfo"
import { authorize } from "@/libs/secure"

export const addNewAccountAction = async({account, cuba = 0}) => {
  if (account && await authorize()) {
    const result = JSON.stringify(await addGDAccount({account, cuba}))
    updateLandingStatsAcc();
    return result
  }
}