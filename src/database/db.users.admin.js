'use server'

import { authorize } from "@/libs/secure"
import { validateUser } from "./db.users"

export const verificarUser = async({user, unvalidate = false}) => {
  const auth = await authorize();
  if (auth) {
    console.log("Entro")
    return JSON.stringify(await validateUser(user, unvalidate))
  }
  return undefined
}