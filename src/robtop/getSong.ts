import { gdRequest } from '@/helpers/request-helper'
import Song from '@/models/Song'
import responseToObj from '@/helpers/responseToObj'

/**
 * Hace una request a los servidores de RobTop y con el body construye un objecto Song
 *
 * Si la canción no existe, o por alguna razón ocurre un error, devuelve -1
 * @author Alejandro-Figueiras
 */
const getSong = async (songID: number) => {
  if (typeof songID != 'number') throw new Error('Se esperaba un id numerico')

  try {
    const body = await gdRequest('getGJSongInfo', { songID })
    return new Song(responseToObj(body, '~|~'))
  } catch (err) {
    console.log(err)
    return -1 // Si no existe la canción va a tirar un server error con -1
  }
}

export default getSong
