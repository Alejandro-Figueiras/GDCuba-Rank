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

export const addUserCloud = async ({ user, password, phone, accountid }) => {
  // const insertQuery = `INSERT INTO users(username, password, phone, status) VALUES('${user}', '${password}', '${phone}', 'v')`;
  const insertQuery = `INSERT INTO users(username, password, phone, accountid) VALUES('${user}', '${password}', '${phone}', '${accountid}')`;
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

export const validateUserCloud = async (username, unvalidate = false) => {
  const modifyQuery = `UPDATE users SET status = '${unvalidate? 'u' : 'v'}' WHERE username = '${username}'`;
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
      userid,
      accountid,
      isregistered,

      stars,
      demons,
      secretcoins,
      usercoins,
      globalrank,
      diamonds,
      creatorpoints,
      modlevel,

      playercolor,
      playercolor2,
      accicon,
      accship,
      accball,
      accbird,
      accwave,
      accrobot,
      accglow,
      accspider,
      accexplosion,

      friendsrqstate,
      messagestate,
      friendstate,
      commenthistorystate,

      youtube,
      twitter,
      twitch,
      timestamp
    ) VALUES(
      '${account.username}',
      '${account.userid}',
      '${account.accountid}',
      '${account.isregistered}',

      '${account.stars}',
      '${account.demons}',
      '${account.secretcoins}',
      '${account.usercoins}',
      '${account.globalrank}',
      '${account.diamonds}',
      '${account.creatorpoints}',
      '${account.modlevel}',

      '${account.playercolor}',
      '${account.playercolor2}',
      '${account.accicon}',
      '${account.accship}',
      '${account.accball}',
      '${account.accbird}',
      '${account.accwave}',
      '${account.accrobot}',
      '${account.accglow}',
      '${account.accspider}',
      '${account.accexplosion}',

      '${account.friendsrqstate}',
      '${account.messagestate}',
      '${account.friendstate}',
      '${account.commenthistorystate}',

      '${account.youtube}',
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
    userid = '${account.userid}',

    stars = '${account.stars}',
    demons = '${account.demons}',
    secretcoins = '${account.secretcoins}',
    usercoins = '${account.usercoins}',
    globalrank = '${account.globalrank}',
    diamonds = '${account.diamonds}',
    creatorpoints = '${account.creatorpoints}',
    modlevel = '${account.modlevel}',
    playercolor = '${account.playercolor}',
    playercolor2 = '${account.playercolor2}',
    accicon = '${account.accicon}',
    accship = '${account.accship}',
    accball = '${account.accball}',
    accbird = '${account.accbird}',
    accwave = '${account.accwave}',
    accrobot = '${account.accrobot}',
    accglow = '${account.accglow}',
    accspider = '${account.accspider}',
    accexplosion = '${account.accexplosion}',
    friendsrqstate = '${account.friendsrqstate}',
    messagestate = '${account.messagestate}',
    friendstate = '${account.friendstate}',
    commenthistorystate = '${account.commenthistorystate}',
    youtube = '${account.youtube}',
    twitter = '${account.twitter}',
    twitch = '${account.twitch}',
    timestamp = '${account.timestamp}'
  ) WHERE accountid = '${id}'`;
  // TODO si el usuario se cambia el nombre actualizar
  await secureQuery(query)
  const accToCache = await secureQuery(`SELECT * FROM gdaccounts WHERE accountid = '${id}'`)
  const acc = accToCache.result.rows[0]
  global.cache.gdaccounts[acc.username] = acc;
  return 1;
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