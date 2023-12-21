"use server"
import { getGDAccount } from "@/database/db.gdaccounts";
import { getUser } from "@/database/db.users"
import { authorize } from "@/libs/secure"

export const getUserAction = async({user}) => {
  if (user && authorize()) {
    const info = await getUser({user});
    info.password = null;
    return JSON.stringify(info);
  }
  return null;
}

export const getAccountAction = async({username}) => {
  if (username && authorize()) {
    return JSON.stringify(await getGDAccount(username))
  }
}