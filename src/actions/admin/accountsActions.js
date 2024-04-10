'use server'
import { addLog } from "@/database/db.auditorylog"
import { changeCuban, removeGDAccount } from "@/database/db.gdaccounts"
import { updateLandingStatsAcc } from "@/database/db.staticInfo"
import { getUser } from "@/database/db.users"
import { authorize } from "@/libs/secure"

export const changeCubanAction = async({username, cuba}) => {
  const authResult = await authorize();
  if (authResult.can) {
    const result = await changeCuban(username, cuba)
    await addLog(`${authResult.username} cambió la etiqueta cuba de ${username} a ${cuba}`)
    updateLandingStatsAcc();
    return result
  }
  return 0
}

export const removeGDAccountAction = async({username}) => {
  const accInfo = await getUser({user: username})
  const authResult = await authorize({owner: (accInfo && accInfo.role != 'user')});
  if (authResult.can) {
    const result = await removeGDAccount(username)
    await addLog(`${authResult.username} eliminó la cuenta de GD de ${username} y todos sus datos en la página`)
    updateLandingStatsAcc();
    return result
  }
  return 0
}