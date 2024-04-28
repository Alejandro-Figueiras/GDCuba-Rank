'use server'

import { getAllUsers, getUnverifiedUsers } from '@/database/db.users'
import { authorize } from '@/libs/secure'

export const getAllUsersAction = async () => {
  if ((await authorize()).can) {
    return JSON.stringify(await getAllUsers())
  }
}

export const getUnverifiedUsersAction = async () => {
  if ((await authorize()).can) {
    return JSON.stringify(await getUnverifiedUsers())
  }
}
