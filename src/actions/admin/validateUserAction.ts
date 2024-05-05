'use server'
import { authorize } from '@/libs/secure'
import { responseText } from '@/locales/siteText'
import { validateUser } from '@/database/db.users'
import { addLog } from '@/database/db.auditorylog'

export const validateUserAction = async ({
  user,
  unvalidate = false
}: {
  user: string
  unvalidate?: boolean
}) => {
  const authResult = await authorize()

  if (!authResult.can) {
    return JSON.stringify({
      error: responseText.unauthorize,
      status: 401
    })
  }

  const result = await validateUser({ user, unvalidate })
  if (result) {
    await addLog(
      `${authResult.username} cambió el estado de ${user} a ${unvalidate ? 'Sin Verificar' : 'Verificado'}`
    )
    return JSON.stringify({
      message: `Usuario ${user} validado correctamente`,
      status: 200,
      user: result
    })
  }

  return JSON.stringify({
    error: responseText.badRequest,
    status: 400
  })
}
