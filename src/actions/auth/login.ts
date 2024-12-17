'use server'
import jwt from 'jsonwebtoken'
import { COOKIES_INFO } from '@/models/constants'
import { compare } from 'bcryptjs'
import { responseText } from '@/locales/siteText'
import { findUser } from '@/database/db.users'
import { cookies } from 'next/headers'
import type CookiePayload from '@/models/CookiePayload'

const ERROR_RESPONSE = {
  status: 'error',
  message: responseText.loginError
}

export const login = async ({
  username,
  password
}: {
  username: string
  password: string
}) => {
  username = username.trim()
  password = password.trimEnd()
  const user = await findUser({ user: username, password: true })

  if (user) {
    const passwordMatch = await compare(password, user.password as string)
    if (passwordMatch) {
      if (user.status == 'b') {
        return JSON.stringify({
          status: 'error',
          message: responseText.bannedAccount
        })
      } else if (user.status == 'u') {
        return JSON.stringify({
          status: 'error',
          message: responseText.unverifiedAccount
        })
      }

      const payload: CookiePayload = {
        username: user.username,
        accountid: user.accountid,
        phone: user.phone,
        role: user.role,
        sessiontoken: user.sessiontoken
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET as string)
      const cookieStore = await cookies()
      cookieStore.set(COOKIES_INFO.name, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Esto es para solo permitir su uso con protocolo ssl
        sameSite: 'strict', // Permitir solo cuando se genere en un mismo dominio
        path: '/',
        maxAge: 60 * 60 * 24 * COOKIES_INFO.exp
      })
      return JSON.stringify({
        status: 'ok',
        message: responseText.loginSuccess,
        user: payload
      })
    }
  }
  return JSON.stringify(ERROR_RESPONSE)
}
