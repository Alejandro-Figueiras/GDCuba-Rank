'use server'
import { addLog } from '@/database/db.auditorylog'
import { eliminarUser } from '@/database/db.users'
import { authorize } from '@/libs/secure'
import { responseText } from '@/locales/siteText'

export const removeUserAction = async ({ username }) => {
  const authResult = await authorize()
  if (!authResult.can || !username) {
    return JSON.stringify({
      error: responseText.unauthorize,
      status: 401
    })
  }
  try {
    console.log(username)
    const result = await eliminarUser({ username })

    if (result != undefined) {
      let response = {
        message: `El usuario ${username} ha sido removido`,
        status: 'success'
      }
      if (result == 0) {
        response = {
          message: `El usuario ${username} no ha sido encontrado`,
          status: 'info'
        }
      }

      if (response.status == 'success') {
        console.log(`User ${username} removed`)
        await addLog(`${authResult.username} eliminó el usuario de ${username}`)
      }

      return JSON.stringify(response)
    }
    return JSON.stringify({
      error: responseText.badRequest,
      status: 400
    })
  } catch (e) {
    console.log(`Error at delete user ${username}`)
    console.log(e)
    return JSON.stringify({
      error: responseText.badRequest,
      status: 400
    })
  }
}
