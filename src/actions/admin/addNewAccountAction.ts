'use server'
import { addLog } from '@/database/db.auditorylog'
import { addGDAccount } from '@/database/db.gdaccounts'
import { updateLandingStatsAcc } from '@/database/db.staticInfo'
import { authorize } from '@/libs/secure'
import type RobTopAccount from '@/models/RobTopAccount'

export const addNewAccountAction = async ({
  account,
  cuba = 0
}: {
  account: RobTopAccount
  cuba?: number
}) => {
  const authResult = await authorize()
  if (account && authResult.can) {
    const result = JSON.stringify(await addGDAccount({ account, cuba }))
    await addLog(
      `${authResult.username} agregó la cuenta de GD de ${account.username}`
    )
    await updateLandingStatsAcc()
    return result
  }
}
