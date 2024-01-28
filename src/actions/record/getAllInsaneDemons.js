'use server'

import { getAllInsaneDemonsVerified } from "@/database/db.records"

export const getAllInsaneDemonsVerifiedAction = async() => {
  return JSON.stringify(await getAllInsaneDemonsVerified())
}