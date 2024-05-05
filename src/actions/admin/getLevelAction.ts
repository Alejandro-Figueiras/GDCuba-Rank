'use server'
import { getLevelByID, getLevels } from '@/robtop/getLevel'

export const getLevelByIDAction = async ({ id }: { id: number }) => {
  return JSON.stringify(await getLevelByID(id))
}

export const getLevelsAction = async ({ query }: { query: string }) => {
  return JSON.stringify(await getLevels(query))
}
