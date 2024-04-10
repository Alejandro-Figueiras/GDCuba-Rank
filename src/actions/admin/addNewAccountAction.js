'use server'
import { addLog } from "@/database/db.auditorylog"
import { addGDAccount } from "@/database/db.gdaccounts"
import { updateLandingStatsAcc } from "@/database/db.staticInfo"
import { authorize } from "@/libs/secure"

export const addNewAccountAction = async({account, cuba = 0}) => {
  const authResult = await authorize();
  if (account && authResult.can) {
    const result = JSON.stringify(await addGDAccount({account, cuba}))
    await addLog(`${authResult.username} agregó la cuenta de GD de ${account.username}`)
    updateLandingStatsAcc();
    return result
  }
}