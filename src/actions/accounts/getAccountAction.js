"use server"
import { getGDAccount } from "@/database/db.gdaccounts";
import { getAccount } from "@/robtop/getAccount";

export const getAccountAction = async({username}) => {
  if (username) {
    return JSON.stringify(await getGDAccount(username))
  }
}

export const getAccountFromRobTopAction = async({username}) => {
  return JSON.stringify(await getAccount(username))
}