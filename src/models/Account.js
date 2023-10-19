export default class Account {
    constructor(body = {}) {
        this.userName = body[1]
        this.userID = parseInt(body[2])
        this.accountID = parseInt(body[16])
        this.isRegistered = parseInt(body[29])
        
        // Stats
        this.stars = parseInt(body[3])
        this.demons = parseInt(body[4])
        this.secretCoins = parseInt(body[13])
        this.usercoins = parseInt(body[17])
        this.globalRank = parseInt(body[30])
        this.diamonds = parseInt(body[46])
        this.creatorpoints = parseInt(body[8])
        this.modlevel = parseInt(body[49]) // 0: None, 1: Normal Mod(yellow), 2: Elder Mod(orange)
        
        // Icons
        this.playerColor = parseInt(body[10])
        this.playerColor2 = parseInt(body[11])
        this.accIcon = parseInt(body[21])
        this.accShip = parseInt(body[22])
        this.accBall = parseInt(body[23])
        this.accBird = parseInt(body[24])
        this.accWave = parseInt(body[25])
        this.accRobot = parseInt(body[26])
        this.accGlow = parseInt(body[28])
        this.accSpider = parseInt(body[43])
        this.accExplosion = parseInt(body[48])
        
        // Social in GD
        this.friendsState = parseInt(body[19]) // 0: All, 1: None
        this.messageState = parseInt(body[18]) // 0: All, 1: Only friends, 2: None
        this.friendstate = parseInt(body[31]) // 0: None, 1: already is friend, 3: send request to target, but target haven't accept, 4: target send request, but haven't accept
        this.commentHistoryState = parseInt(body[50]) // 0: All, 1: Only friends, 2: None
        
        // Social Media
        this.youTube = body[20]
        this.twitter = body[44]
        this.twitch = body[45]
    }
}