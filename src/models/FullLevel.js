export default class FullLevel {
    
    constructor(body = {}) {
        this.levelString = body[4] | "No data for you :(" // All the data for the level
        this.gameVersion = body[13]
        
        // General Info
        this.id = body[1]
        this.levelName = body[2]
        this.description = decryptBase64(body[3])
        this.version = body[5]
        this.playerID = body[6]
        
        // Stats
        this.dislikes = body[16]
        this.length = body[15] // 0-4, where 0 is tiny and 4 is XL
        this.downloads = body[10]
        this.likes = body[14]
        this.coins = body[37]
        this.verifiedCoins = body[38] // boolean
        
        // Dificultad
        this.stars = body[18]
        this.starsRequested = body[39]
        this.difficultyDenominator = body[8] // Returns 0 if the level is N/A, returns 10 if a difficulty is assigned
        this.difficultyNumerator = body[9] // 0 = unrated, 10 = easy, 20 = normal, 30 = hard, 40 = harder, 50 = insane
        this.auto = body[25] // boolean
        this.demon = body[17] // boolean
        this.demonDifficulty = body[43] // 3 = easy, 4 = medium, 0 = hard, 5 = insane, 6 = extreme
        this.featureScore = body[19] // 0 if the level is not featured, otherwise a positive number. The higher it is, the higher the level appears on the featured levels list.
        this.epic = body[42]
        
        // Song
        this.officialSong = body[12]
        this.customSongID = body[35]

        // General
        this.password = body[27]
        this.lowDetailMode = body[40]
        this.twoPlayer = body[31]
        this.dailyNumber = body[41] | -1 // Daily/weekly levels only. Returns which daily/weekly the level was (e.g. the 500th daily level). Subtract 100,000 if the level is weekly
        this.copiedID = body[30]
        this.isGauntlet = body[44]
        this.uploadDate = body[28]
        this.updateDate = body[29]
        this.objects = body[45] // 16-bit integer limit so any level with more objects won't be accurate

    }

}