'use server'
import { RequestResult } from "@/models/RequestResult.js";
import config from "./db.config.js";
import { Pool } from "pg";
import { isNumeric } from "@/libs/utils.js";
import { getAccountByID } from "@/robtop/getAccount.js";

const createPool = async () => {
  const pool = new Pool(config);
  return pool;
};

export const secureQuery = async (query) => {
  const queryResult = new RequestResult(); //{ result: undefined, error: undefined };

  const pool = await createPool();
  try {
    const result = await pool.query(query);
    // console.log(query, result.rows);

    queryResult.result = result;
  } catch (err) {
    queryResult.error = err;
  }

  pool.end();
  return queryResult;
};

export const cleanTable = async (table) => {
  const insertQuery = `DELETE FROM ${table}`;
  console.log(insertQuery);
  return await secureQuery(insertQuery);
};

// --------------- USER -------------------

export const addUserCloud = async ({ user, password, phone, accountID }) => {
  // const insertQuery = `INSERT INTO users(username, password, phone, status) VALUES('${user}', '${password}', '${phone}', 'v')`;
  const insertQuery = `INSERT INTO users(username, password, phone, accountID) VALUES('${user}', '${password}', '${phone}', '${accountID}')`;
  console.log(insertQuery);
  return await secureQuery(insertQuery);
};

export const removeUserCloud = async (id) => {
  // const insertQuery = `INSERT INTO users(username, password, phone, status) VALUES('${user}', '${password}', '${phone}', 'v')`;
  const removeQuery = isNumeric(id)
    ? `DELETE FROM users WHERE accountid = '${id}'`
    : `DELETE FROM users WHERE username = '${id}'`;

  console.log(removeQuery);

  return await secureQuery(removeQuery);
};

export const validateUserCloud = async (username) => {
  const modifyQuery = `UPDATE users SET status = 'v' WHERE username = '${username}'`;
  return await secureQuery(modifyQuery);
};

export const getUsersCloud = async (id) => {
  let query;
  switch (id) {
    case "all": query = "SELECT * from users"; break;
    case "u":   query = `SELECT * from users WHERE status = 'u'`; break;
    default:    query = `SELECT * from users WHERE accountid = '${id}'`;
  }

  const queryResult = await secureQuery(query);
  if (!queryResult.error) {
    return queryResult.result;
  } else {
    console.error("Error at getUsers: ", queryResult.error);
    return -1;
  }
};

// --------------- GD ACCOUNT -------------------

export const addAccountCloud = async (account) => {
  const insertQuery = `INSERT INTO gdaccounts (
      username,
      userID,
      accountID,
      isRegistered,

      stars,
      demons,
      secretCoins,
      userCoins,
      globalRank,
      diamonds,
      creatorpoints,
      modlevel,

      playerColor,
      playerColor2,
      accIcon,
      accShip,
      accBall,
      accBird,
      accWave,
      accRobot,
      accGlow,
      accSpider,
      accExplosion,

      friendsRqState,
      messageState,
      friendstate,
      commentHistoryState,

      youTube,
      twitter,
      twitch,
      timestamp
    ) VALUES(
      '${account.username}',
      '${account.userID}',
      '${account.accountID}',
      '${account.isRegistered}',

      '${account.stars}',
      '${account.demons}',
      '${account.secretCoins}',
      '${account.userCoins}',
      '${account.globalRank}',
      '${account.diamonds}',
      '${account.creatorpoints}',
      '${account.modlevel}',

      '${account.playerColor}',
      '${account.playerColor2}',
      '${account.accIcon}',
      '${account.accShip}',
      '${account.accBall}',
      '${account.accBird}',
      '${account.accWave}',
      '${account.accRobot}',
      '${account.accGlow}',
      '${account.accSpider}',
      '${account.accExplosion}',

      '${account.friendsRqState}',
      '${account.messageState}',
      '${account.friendstate}',
      '${account.commentHistoryState}',

      '${account.youTube}',
      '${account.twitter}',
      '${account.twitch}',
      '${account.timestamp}'
    )`;
  return await secureQuery(insertQuery);
};

export const getAllAccounts = async() => {
  const query = 'SELECT * FROM gdaccounts';
  return await secureQuery(query)
}

export const updateAccount = async(id) => {
  const account = await getAccountByID(id);
  if (account == -1) {
    console.log("ERROR en updateAccount, getAccountByID devuelve -1")
    return
  }
  const query = `UPDATE gdaccounts SET
    username = '${account.username}',
    userID = '${account.userID}',

    stars = '${account.stars}',
    demons = '${account.demons}',
    secretCoins = '${account.secretCoins}',
    userCoins = '${account.userCoins}',
    globalRank = '${account.globalRank}',
    diamonds = '${account.diamonds}',
    creatorpoints = '${account.creatorpoints}',
    modlevel = '${account.modlevel}',
    playerColor = '${account.playerColor}',
    playerColor2 = '${account.playerColor2}',
    accIcon = '${account.accIcon}',
    accShip = '${account.accShip}',
    accBall = '${account.accBall}',
    accBird = '${account.accBird}',
    accWave = '${account.accWave}',
    accRobot = '${account.accRobot}',
    accGlow = '${account.accGlow}',
    accSpider = '${account.accSpider}',
    accExplosion = '${account.accExplosion}',
    friendsRqState = '${account.friendsRqState}',
    messageState = '${account.messageState}',
    friendstate = '${account.friendstate}',
    commentHistoryState = '${account.commentHistoryState}',
    youTube = '${account.youTube}',
    twitter = '${account.twitter}',
    twitch = '${account.twitch}',
    timestamp = '${account.timestamp}'
  ) WHERE accountID = '${id}'`;
  // TODO si el usuario se cambia el nombre actualizar
  await secureQuery(query)
  return 1;
}

// -------- RANKINGS -----------
export const getStarsRank = async() => {
  const query = 'SELECT id, username, stars, globalRank FROM gdaccounts ORDER BY stars DESC'
  const queryResult = await secureQuery(query);
  if (!queryResult.error) {
    return queryResult.result.rows;
  } else {
    console.error("Error at getStarsRank: ", queryResult.error);
    return -1;
  }
  
}

export const updateAccounts = async({limit= 3, timeLimit = 60000}) => {
  // Comprueba el timestamp
  const timestamp = new Date().getTime()
  if (timeLimit && timestamp-global.cache.accUpdateLimit<timeLimit) return
  global.cache.accUpdateLimit = timestamp;
  
  console.log("DATABASE: actualizando accounts")
  // Pregunta las cuentas con la información más antigua
  const query = `SELECT accountid FROM gdaccounts ORDER BY timestamp ASC LIMIT ${limit}`
  const queryResult = await secureQuery(query);
  if (!queryResult.error) {
    // Request a los servidores de Rob
    for (const acc of queryResult.result.rows) {
      await updateAccount(acc.accountid)
    }

    // Actualizando Timestamp
    const timestamp = new Date().getTime()
    global.cache.accUpdateLimit = timestamp;

    console.log("DATABASE: actualizando accounts completado")

  } else {
    console.error("Error at getStarsRank: ", queryResult.error);
    return -1;
  }
}