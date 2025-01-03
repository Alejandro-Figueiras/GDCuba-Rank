'use server'
import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { COOKIES_INFO } from '@/models/constants'
import { responseText } from '@/locales/siteText'
import { getUserByAccountID } from '@/database/db.users'
import jwt from 'jsonwebtoken'
import { logout } from '../logout/logout'
import type CookiePayload from '@/models/CookiePayload'

export interface AuthMeResult extends CookiePayload {
  status?: number
}

export const authMe = async ({
  forceRevalidate = false
}: { forceRevalidate?: boolean } = {}) => {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(COOKIES_INFO.name)

  if (cookie) {
    try {
      let payload = verify(
        cookie.value,
        process.env.JWT_SECRET as string
      ) as CookiePayload & { iat: number }

      if (
        Math.floor(Date.now() / 1000) - payload.iat > 24 * 60 * 60 ||
        forceRevalidate
      ) {
        const result = await revalidateToken(
          payload.accountid,
          payload.sessiontoken as number | string
        )
        if (result == -1) {
          return JSON.stringify({ error: responseText.badRequest, status: 401 })
        }
        payload = verify(
          result,
          process.env.JWT_SECRET as string
        ) as CookiePayload & { iat: number }
      }
      const user = {
        username: payload.username,
        accountid: payload.accountid,
        phone: payload.phone,
        role: payload.role,
        sessiontoken: payload.sessiontoken,
        status: 200
      } as CookiePayload

      if (user.sessiontoken == undefined) user.sessiontoken = 0

      return JSON.stringify(user)
    } catch (err) {
      console.log(err)
      console.log('Token invalid!')
    }
  }
  return JSON.stringify({ error: responseText.badRequest, status: 401 })
}

const revalidateToken = async (
  accountid: number,
  sessiontoken: string | number
) => {
  const account = await getUserByAccountID({ accountid: accountid })
  if (
    !account ||
    account.status == 'b' ||
    account.sessiontoken != sessiontoken
  ) {
    await logout()
    return -1
  }
  const token = jwt.sign(
    {
      username: account.username,
      accountid: account.accountid,
      phone: account.phone,
      role: account.role,
      sessiontoken: account.sessiontoken
    },
    process.env.JWT_SECRET as string
  )
  const cookieStore = await cookies()
  cookieStore.set(COOKIES_INFO.name, token, {
    httpOnly: true, // esto es algo de privadicad pero no recuerdo que
    secure: process.env.NODE_ENV === 'production', // Esto es para solo permitir su uso con protocolo ssl
    sameSite: 'strict', // Permitir solo cuando se genere en un mismo dominio
    path: '/', // Esto nunca lo entendi
    maxAge: 60 * 60 * 24 * COOKIES_INFO.exp
  })
  console.log('Token revalidated')
  return token
}
