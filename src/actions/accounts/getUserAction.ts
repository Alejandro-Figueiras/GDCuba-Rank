'use server'

import { getUser } from '@/database/db.users'

export const getUserAction = async ({ user }: { user: string }) => {
  if (user) {
    const info = { ...(await getUser({ user })) }
    return JSON.stringify(info)
  }
  return null
}
