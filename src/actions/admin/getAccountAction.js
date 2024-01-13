"use server"
import { getGDAccount, getAllGDAccounts } from "@/database/db.gdaccounts";
import { authorize } from "@/libs/secure"
import { getAccount } from "@/robtop/getAccount";

export const getAccountAction = async({username}) => {
  if (username && await authorize()) {
    return JSON.stringify(await getGDAccount(username))
  }
}

export const getAllAccountsAction = async() => {
  if (await authorize()) {
    return JSON.stringify(await getAllGDAccounts())
  }
}


export const getAccountFromRobTopAction = async({username}) => {
  return JSON.stringify(await getAccount(username))
}