export default class FullLevel {
    
    constructor(body = {}) {
        this.levelString = body[4] | "No data for you :(" // All the data for the level
        this.gameVersion = body[13]
        
        // General Info
        this.id = body[1]
        this.levelname = body[2]
        this.description = decryptBase64(body[3])
        this.version = body[5]
        this.playerid = body[6]
        
        // Stats
        this.dislikes = body[16]
        this.length = body[15] // 0-4, where 0 is tiny and 4 is XL
        this.downloads = body[10]
        this.likes = body[14]
        this.coins = body[37]
        this.verifiedcoins = body[38] // boolean
        
        // Dificultad
        this.stars = body[18]
        this.starsrequested = body[39]
        this.difficultydenominator = body[8] // Returns 0 if the level is N/A, returns 10 if a difficulty is assigned
        this.difficultynumerator = body[9] // 0 = unrated, 10 = easy, 20 = normal, 30 = hard, 40 = harder, 50 = insane
        this.auto = body[25] // boolean
        this.demon = body[17] // boolean
        this.demondifficulty = body[43] // 3 = easy, 4 = medium, 0 = hard, 5 = insane, 6 = extreme
        this.featurescore = body[19] // 0 if the level is not featured, otherwise a positive number. The higher it is, the higher the level appears on the featured levels list.
        this.epic = body[42]
        
        // Song
        this.officialsong = body[12]
        this.customsongid = body[35]

        // General
        this.password = body[27]
        this.lowdetailmode = body[40]
        this.twoplayer = body[31]
        this.dailynumber = body[41] | -1 // Daily/weekly levels only. Returns which daily/weekly the level was (e.g. the 500th daily level). Subtract 100,000 if the level is weekly
        this.copiedid = body[30]
        this.isgauntlet = body[44]
        this.uploaddate = body[28]
        this.updatedate = body[29]
        this.objects = body[45] // 16-bit integer limit so any level with more objects won't be accurate

    }

}