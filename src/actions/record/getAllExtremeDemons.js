'use server'

import { getAllCubanExtremesVerified, getAllCubanExtremesVerifiedPlatformer, getAllCubanExtremesVerifiedTradicional } from "@/database/db.records"

export const getAllCubanExtremesVerifiedAction = async() => {
  return JSON.stringify(await getAllCubanExtremesVerified())
}

export const getAllCubanExtremesVerifiedTradicionalAction = async() => {
  return JSON.stringify(await getAllCubanExtremesVerifiedTradicional())
}

export const getAllCubanExtremesVerifiedPlatformerAction = async() => {
  return JSON.stringify(await getAllCubanExtremesVerifiedPlatformer())
}