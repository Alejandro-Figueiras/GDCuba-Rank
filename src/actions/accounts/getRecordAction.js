'use server'

import { getRecordByID } from '@/database/db.records'

export const getRecordAction = async ({ id }) => {
  if (id) {
    const info = { ...(await getRecordByID({ id })) }
    return JSON.stringify(info)
  }
  return null
}
