'use server'

import { getAllCubans } from '@/database/db.gdaccounts'

export const getAllCubansAction = async () => {
  const values = await getAllCubans()
  return JSON.stringify(values)
}
