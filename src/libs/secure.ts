import { getUser } from '@/database/db.users'
import { COOKIES_INFO } from '@/models/constants'
import { type User } from '@/models/User'
import { type JwtPayload, verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const authorize = async ({ owner = false } = {}): Promise<{
  username: string
  role: string
  can: boolean
}> => {
  const cookie = cookies().get(COOKIES_INFO.name)
  let user: User | undefined
  try {
    if (cookie) {
      const data = verify(
        cookie.value,
        process.env.JWT_SECRET as string
      ) as JwtPayload
      if (!data.role) throw new Error('unauthorized')

      user = await getUser({ user: data.username })
    }

    if (
      user != undefined &&
      (user.role == 'admin' || user.role == 'owner') &&
      ((owner && user.role == 'owner') || !owner)
    ) {
      console.log(`${user.username} Authorized`)
      return {
        username: user.username,
        role: user.role,
        can: true
      }
    }
    console.log(`${user?.username} unathorized`)
    return {
      username: user?.username ?? 'unknown user',
      role: user?.role ?? 'user',
      can: false
    }
  } catch (err) {
    return {
      username: 'unknown user',
      role: 'user',
      can: false
    }
  }
}
