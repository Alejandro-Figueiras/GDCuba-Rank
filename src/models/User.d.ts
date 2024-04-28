export interface User {
  id: number
  username: string
  accountid: number
  phone: string
  status: string
  role: string
  sessiontoken: string | number
  password?: string
}
