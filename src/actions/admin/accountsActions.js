'use server'
import { changeCuban } from "@/database/db.gdaccounts"
import { authorize } from "@/libs/secure"

export const changeCubanAction = async({username, cuba}) => {
  if (await authorize()) {
    return await changeCuban(username, cuba)
  }
  return 0
}