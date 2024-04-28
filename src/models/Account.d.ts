import RobTopAccount from './RobTopAccount'

export interface ServerAccount {
  username: string
  userid: number
  accountid: number
  isregistered: number
  timestamp: number

  stars: number
  demons: number
  demonsbreakdown: string
  secretcoins: number
  usercoins: number
  globalrank: number
  diamonds: number
  moons: number
  creatorpoints: number
  modlevel: number

  playercolor: number
  playercolor2: number
  playercolor3: number
  accicon: number
  accship: number
  accball: number
  accbird: number
  accwave: number
  accrobot: number
  accswing: number
  accjetpack: number
  accglow: number
  accspider: number
  accexplosion: number

  friendsrqstate: number
  messagestate: number
  friendstate: number
  commenthistorystate: number

  youtube: number
  twitter: number
  twitch: number
}

export interface Account extends ServerAccount {
  cuba: number | boolean
  timestamp: number
  stuff: string
}
