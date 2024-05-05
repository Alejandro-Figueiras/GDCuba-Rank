'use server'

import { addLog } from '@/database/db.auditorylog'
import { banUser, getUser } from '@/database/db.users'
import { authorize } from '@/libs/secure'

export const banUserAction = async ({ user }: { user: string }) => {
  const accInfo = await getUser({ user })
  const authResult = await authorize({
    owner: accInfo && accInfo.role != 'user'
  })
  if (authResult.can) {
    const banResult = await banUser({ user })
    if (banResult) await addLog(`${authResult.username} baneó a ${user}`)
    return banResult
  }
  return 0
}
