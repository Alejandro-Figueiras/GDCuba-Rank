'use server'

import { getAllCubanExtremesVerified } from "@/database/db.records"

export const getAllCubanExtremesVerifiedAction = async() => {
  return JSON.stringify(await getAllCubanExtremesVerified())
}