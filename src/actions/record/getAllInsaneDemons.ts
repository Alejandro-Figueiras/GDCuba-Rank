'use server'

import { getAllCubanInsaneDemonsVerified } from '@/database/db.records'

export const getAllCubanInsaneDemonsVerifiedAction = async () => {
  return JSON.stringify(await getAllCubanInsaneDemonsVerified())
}
