import { gdRequest } from "@/helpers/request-helper.js";
import responseToObj from '@/helpers/responseToObj.js';
import Level from "@/models/Level";
import Song from "@/models/Song";

const parseResponse = (body) => {
  const data = body.split("#");
  const authors = data[1].split("|").map(authorRaw => {
    const author = authorRaw.split(":")
    return {
      playerid: parseInt(author[0]),
      playername: author[1],
      accountid: parseInt(author[2])
    }
  })
  const songs = data[2].split("~:~").map(data => new Song(responseToObj(data, "~|~")))

  const levels = data[0].split("|").map(level => {
    return new Level(responseToObj(level), {authors, songs})
  });

  return levels;
}

/**
 * 
 * Hace una request a los servidores de robtop buscando por la id, coge el primer (y único) nivel que sale, y hace el objeto result (consultar [documentación web](http://localhost:9508/#/robtop/getLevel))
 * 
 * Si no existe, devuelve -1
 * 
 * **IMPORTANTE**: Si no tienes el LevelID, usa la función `getLevels`
 * @async
 * @param {Number} id LevelID
 * @returns {{level, author, song}}
 */
export const getLevelByID = async (id) => {
  try {
    // TODO filtrar query para evitar sql injection
    const body = await gdRequest("getGJLevels21", {
      type: '0',
      gdw: '0',
      str: id,
    });
    const respuesta = parseResponse(body)
    return respuesta[0]
  } catch (err) {
    console.log(err)
    return -1;
  }
}

/**
 * Hace una request a los servidores de robtop buscando la query, y devuelve un objeto (consultar [documentación web](http://localhost:9508/#/robtop/getLevel)) con los resultados
 * 
 * Si no hay resultados, devuelve -1
 * @async
 * @param {String} query
 * @returns {{levels, authors, songs}}
 */
export const getLevels = async (query) => {
  try {
    // TODO filtrar query para evitar sql injection
    const body = await gdRequest("getGJLevels21", {
      type: '0',
      gdw: '0',
      str: query,
    });
    return parseResponse(body)
  } catch (err) {
    console.log(err)
    return -1;
  }
}