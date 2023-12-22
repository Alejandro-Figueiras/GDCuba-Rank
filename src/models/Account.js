export default class Account {
    constructor(body ={}, db = false) {
        this.username = (db) ? body.username : body[1]
        this.userid = (db) ? body.userid : parseInt(body[2])
        this.accountid = (db) ? body.accountid : parseInt(body[16])
        this.isregistered = (db) ? body.isregistered : parseInt(body[29])
        
        // Stats
        this.stars = (db) ? body.stars : parseInt(body[3])
        this.demons = (db) ? body.demons : parseInt(body[4])
        this.secretcoins = (db) ? body.secretcoins : parseInt(body[13])
        this.usercoins = (db) ? body.usercoins : parseInt(body[17])
        this.globalrank = (db) ? body.globalrank : parseInt(body[30])
        this.diamonds = (db) ? body.diamonds : parseInt(body[46])
        this.moons = (db) ? body.moons : parseInt(body[52])
        this.creatorpoints = (db) ? body.creatorpoints : parseInt(body[8])
        this.modlevel = (db) ? body.modlevel : parseInt(body[49]) // 0: None, 1: Normal Mod(yellow), 2: Elder Mod(orange)
        
        // Icons
        this.playercolor = (db) ? body.playercolor : parseInt(body[10])
        this.playercolor2 = (db) ? body.playercolor2 : parseInt(body[11])
        this.playercolor3 = (db) ? body.playercolor3 : parseInt(body[51])
        this.accicon = (db) ? body.accicon : parseInt(body[21])
        this.accship = (db) ? body.accship : parseInt(body[22])
        this.accball = (db) ? body.accball : parseInt(body[23])
        this.accbird = (db) ? body.accbird : parseInt(body[24])
        this.accwave = (db) ? body.accwave : parseInt(body[25])
        this.accrobot = (db) ? body.accrobot : parseInt(body[26])
        this.accswing = (db) ? body.accswing : parseInt(body[53])
        this.accjetpack = (db) ? body.accjetpack : parseInt(body[54])
        this.accglow = (db) ? body.accglow : parseInt(body[28])
        this.accspider = (db) ? body.accspider : parseInt(body[43])
        this.accexplosion = (db) ? body.accexplosion : parseInt(body[48])
        
        // Social in GD
        this.friendsrqstate = (db) ? body.friendsrqstate : parseInt(body[19]) // 0: All, 1: None
        this.messagestate = (db) ? body.messagestate : parseInt(body[18]) // 0: All, 1: Only friends, 2: None
        this.friendstate = (db) ? body.friendstate : parseInt(body[31]) // 0: None, 1: already is friend, 3: send request to target, but target haven't accept, 4: target send request, but haven't accept
        this.commenthistorystate = (db) ? body.commenthistorystate : parseInt(body[50]) // 0: All, 1: Only friends, 2: None
        
        // Social Media
        this.youtube = (db) ? body.youtube : body[20]
        this.twitter = (db) ? body.twitter : body[44]
        this.twitch = (db) ? body.twitch : body[45]

        this.timestamp = body.timestamp
    }
}