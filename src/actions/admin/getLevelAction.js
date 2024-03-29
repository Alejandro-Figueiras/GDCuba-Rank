'use server'
import { getLevelByID, getLevels } from "@/robtop/getLevel"

export const getLevelByIDAction = async({id}) => {
  return JSON.stringify(await getLevelByID(id))
}

export const getLevelsAction = async({query}) => {
  return JSON.stringify(await getLevels(query))
}