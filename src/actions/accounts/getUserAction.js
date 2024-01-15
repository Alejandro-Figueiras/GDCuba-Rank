'use server'

import { getUser } from "@/database/db.users";

export const getUserAction = async({user}) => {
  if (user) {
    const info = {...(await getUser({user}))};
    if (info) info.password = null;
    return JSON.stringify(info);
  }
  return null;
}
