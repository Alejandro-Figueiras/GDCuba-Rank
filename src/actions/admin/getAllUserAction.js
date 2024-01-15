'use server'

import { getAllUsers} from "@/database/db.users";
import { authorize } from "@/libs/secure";

export const getAllUsersAction = async() => {
  if (await authorize()) {
    return JSON.stringify(await getAllUsers())
  }
}