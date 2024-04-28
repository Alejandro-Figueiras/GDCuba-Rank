import { decryptBase64 } from '@/helpers/base64'
import Song from './Song'
import Author from './Author'

type LevelOptions = {
  author?: Author | undefined
  song?: Song | undefined
  authors?: Author[]
  songs?: Song[]
  timestamp?: number
}

export default class Level {
  gameversion: number
  id: number
  levelname: string
  description: string
  version: number

  playerid: number
  accountid: number | undefined
  author: string | undefined

  length: number
  platformer: boolean
  downloads: number
  likes: number
  coins: number
  verifiedcoins: boolean

  stars: number
  starsrequested: number
  difficultydenominator: number
  difficultynumerator: number
  auto: boolean
  demon: boolean
  demondifficulty: number
  featurescore: number
  epic: number

  officialsong: number | undefined
  songid: number | undefined
  songname: string | undefined
  songartistid: number | undefined
  songartistname: string | undefined
  songsize: number | undefined
  songvideo: string | undefined
  songartistyt: string | undefined
  songdownloadlink: string | undefined

  twoplayer: number
  dailynumber: number | undefined
  copiedid: number | undefined
  objects: number | undefined
  timestamp: number

  constructor(
    body = {},
    { author, song, authors = [], songs = [], timestamp = 0 }: LevelOptions
  ) {
    this.gameversion = parseInt(body[13])

    // General Info
    this.id = parseInt(body[1])
    this.levelname = body[2]
    this.description = decryptBase64(body[3])
    this.version = parseInt(body[5])

    // Author
    this.playerid = parseInt(body[6])
    if (!author || !author.playername) {
      author = authors.find((v) => v.playerid == this.playerid)
      if (author) {
        this.accountid = author.accountid
        this.author = author.playername
      }
    }

    // Stats
    this.length = parseInt(body[15]) // 0-4, where 0 is tiny and 4 is XL, 5 is platformer
    this.platformer = this.length == 5
    this.downloads = parseInt(body[10])
    this.likes = parseInt(body[14])
    this.coins = parseInt(body[37])
    this.verifiedcoins = body[38] != '0' ? true : false // boolean

    // Dificultad
    this.stars = parseInt(body[18])
    this.starsrequested = parseInt(body[39])
    this.difficultydenominator = parseInt(body[8]) // Returns 0 if the level is N/A, returns 10 if a difficulty is assigned
    this.difficultynumerator = parseInt(body[9]) // 0 = unrated, 10 = easy, 20 = normal, 30 = hard, 40 = harder, 50 = insane
    this.auto = body[25] ? true : false // boolean
    this.demon = body[17] ? true : false // boolean
    this.demondifficulty = parseInt(body[43]) // 3 = easy, 4 = medium, 0 = hard, 5 = insane, 6 = extreme
    this.featurescore = parseInt(body[19]) // 0 if the level is not featured, otherwise a positive number. The higher it is, the higher the level appears on the featured levels list.
    this.epic = parseInt(body[42])

    // Song
    this.officialsong = parseInt(body[12])
    this.songid = parseInt(body[35])
    if (!this.officialsong && (this.songid || !song || songs.length == 0)) {
      song = songs.find((v) => v.id == this.songid)
      if (song) {
        this.songname = song.name
        this.songartistid = song.artistid
        this.songartistname = song.artistname
        this.songsize = song.size // Peso en MB, redondeado a 2 lugares decimales
        this.songvideo = song.video
        this.songartistyt = song.artistyt
        this.songdownloadlink = song.downloadlink
      }
    }

    // General
    this.twoplayer = parseInt(body[31])
    this.dailynumber = parseInt(body[41]) | -1 // Daily/weekly levels only. Returns which daily/weekly the level was (e.g. the 500th daily level). Subtract 100,000 if the level is weekly
    this.copiedid = parseInt(body[30])
    this.objects = parseInt(body[45]) // 16-bit integer limit so any level with more objects won't be accurate
    this.timestamp = timestamp
  }
}
