import { gdRequest } from "@/helpers/request-helper.js";
import responseToObj from '@/helpers/responseToObj.js';
import Level from "@/models/Level";
import Song from "@/models/Song";

const parseResponse = (body) => {
    const data = body.split("#");
    const levels = data[0].split("|").map(level => new Level(responseToObj(level)));
    const authors = data[1].split("|").map(authorRaw => {
        const author = authorRaw.split(":")
        return {
            playerID: parseInt(author[0]),
            playerName: author[1],
            accountID: parseInt(author[2])
        }
    })
    const songs = data[2].split("~:~").map(data => new Song(responseToObj(data, "~|~")))

    return {
        levels,
        authors,
        songs
    }
}

export const getLevelByID = async(id) => {
    try {
        // TODO filtrar query para evitar sql injection
        const body = await gdRequest("getGJLevels21", {
            type: '0',
            gdw: '0',
            str: id,
        });
        const respuesta = parseResponse(body)
        return {
            level: respuesta.levels[0],
            author: (respuesta.authors.length)?respuesta.authors[0]:-1,
            song: (respuesta.songs.length)?respuesta.songs[0]:-1
        }
    } catch (err) {
        console.log(err)
        return -1;
    }
}

export const getLevels = async(query) => {
    try {
        // TODO filtrar query para evitar sql injection
        const body = await gdRequest("getGJLevels21", {
            type: '0',
            gdw: '0',
            str: query,
        });
        return parseResponse(body)
    } catch (err) {
        console.log(err)
        return -1;
    }
}   