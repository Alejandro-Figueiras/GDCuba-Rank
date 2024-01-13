'use server'
import { changeCuban, removeGDAccount } from "@/database/db.gdaccounts"
import { authorize } from "@/libs/secure"

export const changeCubanAction = async({username, cuba}) => {
  if (await authorize()) {
    return await changeCuban(username, cuba)
  }
  return 0
}

export const removeGDAccountAction = async({username}) => {
  if (await authorize()) {
    return await removeGDAccount(username)
  }
  return 0
}