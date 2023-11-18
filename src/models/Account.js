export default class Account {
    constructor(body ={}, db = false) {
        this.username = (db) ? body.username : body[1]
        this.userID = (db) ? body.userid : parseInt(body[2])
        this.accountID = (db) ? body.accountid : parseInt(body[16])
        this.isRegistered = (db) ? body.isregistered : parseInt(body[29])
        
        // Stats
        this.stars = (db) ? body.stars : parseInt(body[3])
        this.demons = (db) ? body.demons : parseInt(body[4])
        this.secretCoins = (db) ? body.secretcoins : parseInt(body[13])
        this.userCoins = (db) ? body.usercoins : parseInt(body[17])
        this.globalRank = (db) ? body.globalrank : parseInt(body[30])
        this.diamonds = (db) ? body.diamonds : parseInt(body[46])
        this.creatorpoints = (db) ? body.creatorpoints : parseInt(body[8])
        this.modlevel = (db) ? body.modlevel : parseInt(body[49]) // 0: None, 1: Normal Mod(yellow), 2: Elder Mod(orange)
        
        // Icons
        this.playerColor = (db) ? body.playercolor : parseInt(body[10])
        this.playerColor2 = (db) ? body.playercolor2 : parseInt(body[11])
        this.accIcon = (db) ? body.accicon : parseInt(body[21])
        this.accShip = (db) ? body.accship : parseInt(body[22])
        this.accBall = (db) ? body.accball : parseInt(body[23])
        this.accBird = (db) ? body.accbird : parseInt(body[24])
        this.accWave = (db) ? body.accwave : parseInt(body[25])
        this.accRobot = (db) ? body.accrobot : parseInt(body[26])
        this.accGlow = (db) ? body.accglow : parseInt(body[28])
        this.accSpider = (db) ? body.accspider : parseInt(body[43])
        this.accExplosion = (db) ? body.accexplosion : parseInt(body[48])
        
        // Social in GD
        this.friendsRqState = (db) ? body.friendsrqstate : parseInt(body[19]) // 0: All, 1: None
        this.messageState = (db) ? body.messagestate : parseInt(body[18]) // 0: All, 1: Only friends, 2: None
        this.friendstate = (db) ? body.friendstate : parseInt(body[31]) // 0: None, 1: already is friend, 3: send request to target, but target haven't accept, 4: target send request, but haven't accept
        this.commentHistoryState = (db) ? body.commenthistorystate : parseInt(body[50]) // 0: All, 1: Only friends, 2: None
        
        // Social Media
        this.youTube = (db) ? body.youtube : body[20]
        this.twitter = (db) ? body.twitter : body[44]
        this.twitch = (db) ? body.twitch : body[45]

        this.timestamp = body.timestamp
    }
}