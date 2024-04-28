'use server'
import { getGDAccount } from '@/database/db.gdaccounts'
import { getAccount } from '@/robtop/getAccount'

export const getAccountAction = async ({ username }: { username: string }) => {
  if (username) {
    return JSON.stringify(await getGDAccount(username))
  }
}

export const getAccountFromRobTopAction = async ({
  username
}: {
  username: string
}) => {
  return JSON.stringify(await getAccount(username))
}
