'use server'
// import { authorize } from "@/libs/secure";

export const getUserAction = async({user}) => {
  if (user) {
    const info = {...global.cache.users[user]};
    if (info) info.password = null;
    return JSON.stringify(info);
  }
  return null;
}

export const getAllUsersAction = async() => {
  // if (await authorize()) {
    return JSON.stringify(Object.values({...global.cache.users}))
  // }
}