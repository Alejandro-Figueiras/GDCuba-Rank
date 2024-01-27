'use server'

import { getAllExtremesVerified } from "@/database/db.records"

export const getAllExtremesVerifiedAction = async() => {
  return JSON.stringify(await getAllExtremesVerified())
}