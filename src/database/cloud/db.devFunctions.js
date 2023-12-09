import { secureQuery } from "./db.functions.js";

export const createUserTable = async () => {
  const createQuery = `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(15) NOT NULL,
        password VARCHAR(255) NOT NULL,
        accountID INTEGER,
        phone VARCHAR(25),
        role VARCHAR(10) NOT NULL DEFAULT 'user',
        status VARCHAR(10) NOT NULL DEFAULT 'u'
    );`;
  try {
    const result = await secureQuery(createQuery);
    console.log("Table create successfuly");
  } catch (err) {
    console.error("Error at create table: ", err);
  }
};

export const createAccountTable = async () => {
  const createQuery = `CREATE TABLE gdaccounts (
        id SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR(15) NOT NULL,
        accountID INTEGER NOT NULL,
        userID INTEGER NOT NULL,
        isRegistered INTEGER,

        stars INTEGER,
        demons INTEGER,
        secretCoins INTEGER,
        userCoins INTEGER,
        globalRank INTEGER,
        diamonds INTEGER,
        creatorpoints INTEGER,
        modlevel INTEGER,
        
        playerColor INTEGER,
        playerColor2 INTEGER,
        accIcon INTEGER,
        accShip INTEGER,
        accBall INTEGER,
        accBird INTEGER,
        accWave INTEGER,
        accRobot INTEGER,
        accGlow INTEGER,
        accSpider INTEGER,
        accExplosion INTEGER,
        
        friendsRqState INTEGER,
        messageState INTEGER,
        friendstate INTEGER,
        commentHistoryState INTEGER,
        
        youtube VARCHAR(30),
        twitter VARCHAR(30),
        twitch VARCHAR(30),

        timestamp BIGINT
    );`;
  try {
    const result = await secureQuery(createQuery);
    console.log(result)
    console.log("Table create successfuly");
  } catch (err) {
    console.error("Error at create table: ", err);
  }
};

export const consult = async(table) => {
  return await secureQuery(`SELECT * FROM ${table}`);
}