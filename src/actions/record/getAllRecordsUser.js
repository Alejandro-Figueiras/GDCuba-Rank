'use server'

import { getAllRecordsUser } from '@/database/db.records'
import { authMe } from '../auth/me'

export const getAllRecordsUserViewAction = async (username) => {
  let records = await getAllRecordsUser(username)
  const auth = JSON.parse(await authMe())
  if (auth.username != username) {
    records = records.filter((val) => {
      if (val.aval == 1) return true

      return false
    })
  }
  return JSON.stringify(records)
}
