import { type ServerAccount } from './Account'

export default class RobTopAccount implements ServerAccount {
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

  constructor(body = {}) {
    this.username = body[1]
    this.userid = parseInt(body[2])
    this.accountid = parseInt(body[16])
    this.isregistered = parseInt(body[29])

    // Stats
    this.stars = parseInt(body[3])
    this.demons = parseInt(body[4])
    this.demonsbreakdown = body[55]
    if (!this.demonsbreakdown) this.demonsbreakdown = 'none'
    this.secretcoins = parseInt(body[13])
    this.usercoins = parseInt(body[17])
    this.globalrank = parseInt(body[30])
    this.diamonds = parseInt(body[46])
    this.moons = parseInt(body[52])
    this.creatorpoints = parseInt(body[8])
    this.modlevel = parseInt(body[49]) // 0: None, 1: Normal Mod(yellow), 2: Elder Mod(orange)

    // Icons
    this.playercolor = parseInt(body[10])
    this.playercolor2 = parseInt(body[11])
    this.playercolor3 = parseInt(body[51])
    this.accicon = parseInt(body[21])
    this.accship = parseInt(body[22])
    this.accball = parseInt(body[23])
    this.accbird = parseInt(body[24])
    this.accwave = parseInt(body[25])
    this.accrobot = parseInt(body[26])
    this.accswing = parseInt(body[53])
    this.accjetpack = parseInt(body[54])
    this.accglow = parseInt(body[28])
    this.accspider = parseInt(body[43])
    this.accexplosion = parseInt(body[48])

    // Social in GD
    this.friendsrqstate = parseInt(body[19]) // 0: All, 1: None
    this.messagestate = parseInt(body[18]) // 0: All, 1: Only friends, 2: None
    this.friendstate = parseInt(body[31]) // 0: None, 1: already is friend, 3: send request to target, but target haven't accept, 4: target send request, but haven't accept
    this.commenthistorystate = parseInt(body[50]) // 0: All, 1: Only friends, 2: None

    // Social Media
    this.youtube = body[20]
    this.twitter = body[44]
    this.twitch = body[45]

    this.timestamp = body['timestamp']
  }
}
