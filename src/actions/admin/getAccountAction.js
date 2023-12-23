"use server"
import { getGDAccount } from "@/database/db.gdaccounts";
import { authorize } from "@/libs/secure"
import { getAccount } from "@/robtop/getAccount";

export const getAccountAction = async({username}) => {
  if (username && authorize()) {
    return JSON.stringify(await getGDAccount(username))
  }
}

export const getAccountFromRobTopAction = async({username}) => {
  return JSON.stringify(await getAccount(username))
}