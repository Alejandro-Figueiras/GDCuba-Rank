import { RobTopDictionary } from '@/helpers/responseToObj'

export default class Song {
  id: number
  name: string
  artistid: number
  artistname: string
  size: number
  video: string | undefined
  artistyt: string | undefined
  downloadlink: string | undefined

  constructor(body: RobTopDictionary = {}) {
    this.id = parseInt(body[1])
    this.name = body[2]
    this.artistid = parseInt(body[3])
    this.artistname = body[4]
    this.size = parseFloat(body[5]) // Peso en MB, redondeado a 2 lugares decimales
    this.video = body[6]
    this.artistyt = body[7]
    this.downloadlink = body[10]
  }
}
