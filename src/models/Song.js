export default class Song {
    
    constructor(body = {}) {
        this.id = parseInt(body[1]);
        this.name = body[2];
        this.artistId = parseInt(body[3]);
        this.artistName = body[4];
        this.size = parseFloat(body[5]); // Peso en MB, redondeado a 2 lugares decimales
        this.video = body[6];
        this.artistYT = body[7];
        this.downloadLink = body[10];
    }

}