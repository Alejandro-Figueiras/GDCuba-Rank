import { gdRequest } from "../../helpers/request-helper.js";
import Song from '../models/Song.js'
import responseToObj from '../../helpers/responseToObj.js';

export default async(req, songID) => {
    if (typeof songID != 'number') throw new Error("Se esperaba un id numerico");

    try {
        const body = await gdRequest("getGJSongInfo", {songID});
        console.log(body)
        return new Song(responseToObj(body));
    } catch (err) {
        console.log(err)
        return err; // Si no existe la canción va a tirar un server error con -1
    }
}