import { decryptBase64 } from "@/helpers/base64"

export default class Level {
    
    constructor(body = {}) {
        this.gameVersion = parseInt(body[13])
        
        // General Info
        this.id = parseInt(body[1])
        this.levelName = body[2]
        this.description = decryptBase64(body[3])
        this.version = parseInt(body[5])
        this.playerID = parseInt(body[6])
        
        // Stats
        this.length = parseInt(body[15]) // 0-4, where 0 is tiny and 4 is XL
        this.downloads = parseInt(body[10])
        this.likes = parseInt(body[14])
        this.coins = parseInt(body[37])
        this.verifiedCoins = (body[38])?true:false // boolean
        
        // Dificultad
        this.stars = parseInt(body[18])
        this.starsRequested = parseInt(body[39])
        this.difficultyDenominator = parseInt(body[8]) // Returns 0 if the level is N/A, returns 10 if a difficulty is assigned
        this.difficultyNumerator = parseInt(body[9]) // 0 = unrated, 10 = easy, 20 = normal, 30 = hard, 40 = harder, 50 = insane
        this.auto = (body[25])?true:false // boolean
        this.demon = (body[17])?true:false // boolean
        this.demonDifficulty = parseInt(body[43]) // 3 = easy, 4 = medium, 0 = hard, 5 = insane, 6 = extreme
        this.featureScore = parseInt(body[19]) // 0 if the level is not featured, otherwise a positive number. The higher it is, the higher the level appears on the featured levels list.
        this.epic = parseInt(body[42])
        
        // Song
        this.officialSong = parseInt(body[12])
        this.customSongID = parseInt(body[35])

        // General
        this.twoPlayer = parseInt(body[31])
        this.dailyNumber = parseInt(body[41]) | -1 // Daily/weekly levels only. Returns which daily/weekly the level was (e.g. the 500th daily level). Subtract 100,000 if the level is weekly
        this.copiedID = parseInt(body[30])
        this.objects = parseInt(body[45]) // 16-bit integer limit so any level with more objects won't be accurate

    }

}