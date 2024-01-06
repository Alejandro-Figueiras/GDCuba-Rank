'use server'
import { getLevelByID, getLevels } from "@/robtop/getLevel"

export const getLevelByIDAction = async({id}) => {
  // TODO esto es dev, falta usar el kv
  return JSON.stringify(await getLevelByID(id))
}

export const getLevelsAction = async({query}) => {
  // TODO esto es dev, falta usar el kv
  return JSON.stringify(await getLevels(query))
}