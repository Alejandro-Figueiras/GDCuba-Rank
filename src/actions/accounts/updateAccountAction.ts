'use server'

import { updateAccountCloud } from '@/database/db.gdaccounts.functions'

export const updateAccountAction = async (
  accountid: number,
  username: string
) => {
  console.log(`Actualizando individualmente ${username}`)
  return JSON.stringify(await updateAccountCloud(accountid, username))
}
