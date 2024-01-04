'use server'
import { getLevelByID } from "@/robtop/getLevel"

export const getLevelByIDAction = async({id}) => {
  // TODO esto es dev, falta usar el kv
  return JSON.stringify(await getLevelByID(id))
}