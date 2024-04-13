"use server"

import { addLog } from "@/database/db.auditorylog";
import { setUserPassword } from "@/database/db.users";
import { authorize } from "@/libs/secure";
import { responseText } from "@/locales/siteText";
import { hash } from "bcryptjs"

export const resetPasswordAction = async({username}) => {
  const authResult = await authorize({owner: true})
  if (!authResult.can || !username) {
    return JSON.stringify({ 
      error: responseText.unauthorize,
      status: 401
     });
  }

  const result = await setUserPassword({username, password: await hash("1234", 5)})
  if (result) await addLog(`${authResult.username} reestableció la contraseña de ${username}`)
  return result
}