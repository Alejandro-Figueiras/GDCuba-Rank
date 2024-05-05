'use server'

import { addLog } from '@/database/db.auditorylog'
import { changeUserRole } from '@/database/db.users'
import { authorize } from '@/libs/secure'
import { responseText } from '@/locales/siteText'

export const changeUserRoleAction = async ({
  user,
  role
}: {
  user: string
  role: string
}) => {
  const authResult = await authorize({ owner: true })

  if (!authResult.can) {
    return JSON.stringify({
      error: responseText.unauthorize,
      status: 401
    })
  }

  const result = await changeUserRole({ user, role })
  if (!result) {
    await addLog(`${authResult.username} le otorgó a ${user} el rol de ${role}`)
    return JSON.stringify({
      message: `Usuario ${user} ahora es ${role}`,
      status: 200,
      user: result
    })
  }

  return JSON.stringify({
    error: responseText.badRequest,
    status: 400
  })
}
