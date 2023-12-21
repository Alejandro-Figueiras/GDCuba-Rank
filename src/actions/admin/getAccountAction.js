"use server"
import { getGDAccount } from "@/database/db.gdaccounts";
import { authorize } from "@/libs/secure"

export const getAccountAction = async({username}) => {
  if (username && authorize()) {
    return JSON.stringify(await getGDAccount(username))
  }
}