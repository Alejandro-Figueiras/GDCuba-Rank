import { gdRequest } from '@/helpers/request-helper'
import responseToObj from '@/helpers/responseToObj'
import Level from '@/models/Level'
import Song from '@/models/Song'
import type Author from '@/models/Author'

const parseResponse = (body: string) => {
  const data = body.split('#')
  const authors = data[1].split('|').map((authorRaw): Author => {
    const author = authorRaw.split(':')
    return {
      playerid: parseInt(author[0]),
      playername: author[1],
      accountid: parseInt(author[2])
    }
  })
  const songs = data[2]
    .split('~:~')
    .map((data) => new Song(responseToObj(data, '~|~')))

  const levels = data[0].split('|').map((level) => {
    return new Level(responseToObj(level), {
      authors,
      songs,
      timestamp: new Date().getTime()
    })
  })

  return levels
}

/**
 *
 * Hace una request a los servidores de robtop buscando por la id, coge el primer (y único) nivel que sale, y hace el objeto result (consultar [documentación web](http://localhost:9508/#/robtop/getLevel))
 *
 * Si no existe, devuelve -1
 *
 * **IMPORTANTE**: Si no tienes el LevelID, usa la función `getLevels`
 */
export const getLevelByID = async (id: number) => {
  try {
    const body = await gdRequest('getGJLevels21', {
      type: '0',
      gdw: '0',
      str: id
    })
    const respuesta = parseResponse(body)
    return respuesta[0]
  } catch (err) {
    console.log(err)
    return -1
  }
}

/**
 * Hace una request a los servidores de robtop buscando la query, y devuelve un objeto (consultar [documentación web](http://localhost:9508/#/robtop/getLevel)) con los resultados
 *
 * Si no hay resultados, devuelve -1
 */
export const getLevels = async (query: string) => {
  try {
    const body = await gdRequest('getGJLevels21', {
      type: '0',
      gdw: '0',
      str: query
    })
    const response = parseResponse(body)
    return response
  } catch (err) {
    console.log(err)
    return -1
  }
}
