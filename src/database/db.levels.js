'use server'
import { getLevelByID } from '@/robtop/getLevel'
import {kv} from '@vercel/kv'

export const getLevel = async({levelID = 0}) => {
  const level = await kv.get(`level:${levelID}`)
  if (!level) {
    console.log(`Buscando ${levelID} donde robtop`)
    const fromRob = await getLevelByID(levelID);
    if (fromRob !=-1) {
      return setLevel({level: fromRob})
    } else return undefined;
  }
  console.log(`Retorna level ${levelID} desde KV`)
  return level
}

export const setLevel = async({level}) => {
  await kv.set(`level:${level.id}`, level)
  return level;
}

export const removeLevel = async({levelid = 0}) => {
  if (kv.exists(`level:${levelid}`)) 
    await kv.del(`level:${levelid}`)
}

export const getAllLevelKeys = async() => {
  const all = await kv.keys(`level:*`);
  console.log("All :", all)
}