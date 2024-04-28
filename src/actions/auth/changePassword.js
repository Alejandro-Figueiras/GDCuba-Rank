'use server'
import { compare, hash } from 'bcryptjs'
import { findUser, setUserPassword } from '@/database/db.users'
import { authMe } from './me'

export const changePasswordAction = async ({
  username,
  oldPassword,
  newPassword
}) => {
  const auth = JSON.parse(await authMe({ forceRevalidate: true }))
  if (auth.status != 200 || auth.username != username)
    return JSON.stringify({
      status: 'error',
      message: 'Unauthorized'
    })

  const user = await findUser({ user: username })

  if (user) {
    const passwordMatch = await compare(oldPassword, user.password)
    if (passwordMatch) {
      const passwordEncrypt = await hash(newPassword, 5)
      setUserPassword({ username, password: passwordEncrypt })

      return JSON.stringify({
        status: 'ok',
        message: 'Contraseña cambiada correctamente'
      })
    } else {
      return JSON.stringify({
        status: 'error',
        message: 'La contraseña antigua es incorrecta'
      })
    }
  } else {
    return JSON.stringify({
      status: 'error',
      message: 'Error al encontrar al usuario'
    })
  }
}
