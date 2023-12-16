import { decryptBase64 } from "@/helpers/base64"

export default class Level {
    
    constructor(body = {}) {
        this.gameVersion = parseInt(body[13])
        
        // General Info
        this.id = parseInt(body[1])
        this.levelname = body[2]
        this.description = decryptBase64(body[3])
        this.version = parseInt(body[5])
        this.playerid = parseInt(body[6])
        
        // Stats
        this.length = parseInt(body[15]) // 0-4, where 0 is tiny and 4 is XL
        this.downloads = parseInt(body[10])
        this.likes = parseInt(body[14])
        this.coins = parseInt(body[37])
        this.verifiedcoins = (body[38])?true:false // boolean
        
        // Dificultad
        this.stars = parseInt(body[18])
        this.starsrequested = parseInt(body[39])
        this.difficultydenominator = parseInt(body[8]) // Returns 0 if the level is N/A, returns 10 if a difficulty is assigned
        this.difficultynumerator = parseInt(body[9]) // 0 = unrated, 10 = easy, 20 = normal, 30 = hard, 40 = harder, 50 = insane
        this.auto = (body[25])?true:false // boolean
        this.demon = (body[17])?true:false // boolean
        this.demondifficulty = parseInt(body[43]) // 3 = easy, 4 = medium, 0 = hard, 5 = insane, 6 = extreme
        this.featurescore = parseInt(body[19]) // 0 if the level is not featured, otherwise a positive number. The higher it is, the higher the level appears on the featured levels list.
        this.epic = parseInt(body[42])
        
        // Song
        this.officialsong = parseInt(body[12])
        this.customsongid = parseInt(body[35])

        // General
        this.twoplayer = parseInt(body[31])
        this.dailynumber = parseInt(body[41]) | -1 // Daily/weekly levels only. Returns which daily/weekly the level was (e.g. the 500th daily level). Subtract 100,000 if the level is weekly
        this.copiedid = parseInt(body[30])
        this.objects = parseInt(body[45]) // 16-bit integer limit so any level with more objects won't be accurate

    }

}