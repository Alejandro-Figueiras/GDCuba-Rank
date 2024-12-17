'use server'
import { responseText } from '@/locales/siteText'
import { COOKIES_INFO } from '@/models/constants'
import { cookies } from 'next/headers'

export const logout = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIES_INFO.name)
  return JSON.stringify({ status: 200, message: responseText.success })
}
