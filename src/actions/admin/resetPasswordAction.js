"use server"

import { setUserPassword } from "@/database/db.users";
import { authorize } from "@/libs/secure";
import { responseText } from "@/locales/siteText";
import { hash } from "bcryptjs"

export const resetPasswordAction = async({username}) => {
  if (!(await authorize()) || !username) {
    return JSON.stringify({ 
      error: responseText.unauthorize,
      status: 401
     });
  }

  const result = await setUserPassword({username, password: await hash("1234", 5)})
  console.log(result)
  return result
}