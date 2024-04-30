'use server'
import { getLevels } from '@/robtop/getLevel'

export const getLevelsFromGD = async ({ data }: { data: string }) => {
  const levels = await getLevels(data)
  return JSON.stringify(levels)
}
