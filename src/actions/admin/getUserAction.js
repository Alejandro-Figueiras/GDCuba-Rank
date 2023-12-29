'use server'

import { getAllUsers, getUser } from "@/database/db.users";

import { authorize } from "@/libs/secure";

export const getUserAction = async({user}) => {
  if (user) {
    const info = {...(await getUser({user}))};
    if (info) info.password = null;
    return JSON.stringify(info);
  }
  return null;
}

export const getAllUsersAction = async() => {
  if (await authorize()) {
    return JSON.stringify(await getAllUsers())
  }
}