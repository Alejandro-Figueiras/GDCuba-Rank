export default class User {
    constructor(body = {}) {
        this.userName = body[1]
        this.userID = body[2]
        this.accountID = body[16]
        this.accountHighlight = body[7] // The accountID of the player. Is used for highlighting the player on the leaderboards
        this.special = body[15] // no se. Dice las docs: The special number of the player use
        this.isRegistered = body[29]
        this.age = body[42] // the time since you submitted a levelScore
        
        // Stats
        this.stars = body[3]
        this.demons = body[4]
        this.secretCoins = body[13]
        this.usercoins = body[17]
        this.globalRank = body[30]
        this.ranking = body[6] // the global leaderboard position of the player
        this.diamonds = body[46]
        this.creatorpoints = body[8]
        this.modlevel = body[49] // 0: None, 1: Normal Mod(yellow), 2: Elder Mod(orange)
        
        // Icons
        this.playerColor = body[10]
        this.playerColor2 = body[11]
        this.iconID = body[9]
        this.iconType = body[14]
        this.accIcon = body[21]
        this.accShip = body[22]
        this.accBall = body[23]
        this.accBird = body[24]
        this.accWave = body[25]
        this.accRobot = body[26]
        this.accStreak = body[27]
        this.accGlow = body[28]
        this.accSpider = body[43]
        this.accExplosion = body[48]
        
        // Social in GD
        this.friendsState = body[19] // 0: All, 1: None
        this.messageState = body[18] // 0: All, 1: Only friends, 2: None
        this.messages = body[38]
        this.friendstate = body[31] // 0: None, 1: already is friend, 3: send request to target, but target haven't accept, 4: target send request, but haven't accept
        this.friendRequests = body[39]
        this.newFriends = body[40]
        this.NewFriendRequest = body[41]
        this.commentHistoryState = body[50] // 0: All, 1: Only friends, 2: None
        
        // Social Media
        this.youTube = body[20]
        this.twitter = body[44]
        this.twitch = body[45]
    }
}