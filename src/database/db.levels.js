'use server'
import { getLevelByID } from '@/robtop/getLevel'
import {kv} from '@vercel/kv'
import { unstable_noStore as noStore } from 'next/cache';

/**
 * Consulta si el nivel está en KV, sino lo busca en el servidor de robtop y luego de encontrado lo devuelve.
 * @param {{levelID: Number}} Object
 * @returns Level
 */
export const getLevel = async({levelID = 0}) => {
  noStore()
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

/**
 * Agrega o actualiza un nivel en KV
 * @param {{level: Level}} Object
 * @returns level
 */
export const setLevel = async({level}) => {
  noStore()
  await kv.set(`level:${level.id}`, level)
  return level;
}

/**
 * Comprueba si existe el nivel en el KV, posteriormente lo elimina.
 * @async
 * @param {{levelid}} LevelID
 */
export const removeLevel = async({levelid = 0}) => {
  noStore();
  if (await kv.exists(`level:${levelid}`)) 
    await kv.del(`level:${levelid}`)
}

/**
 * Retorna todas las Keys de niveles guardados en el KV
 * @async
 * @returns Array of Keys
 */
export const getAllLevelKeys = async() => {
  noStore()
  const all = await kv.keys(`level:*`);
  return all;
}