import { JwtPayload } from 'jsonwebtoken'

export default interface CookiePayload extends JwtPayload {
  username: string
  accountid: number
  phone: string
  role: string
  sessiontoken?: string | number
}
