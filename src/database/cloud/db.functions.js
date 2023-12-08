import { RequestResult } from "@/models/RequestResult.js";
import config from "./db.config.js";
import { Pool } from "pg";
import { isNumeric } from "@/libs/utils.js";

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

export const addUser = async ({ user, password, phone, accountID }) => {
  // const insertQuery = `INSERT INTO users(username, password, phone, status) VALUES('${user}', '${password}', '${phone}', 'v')`;
  const insertQuery = `INSERT INTO users(username, password, phone, accountID) VALUES('${user}', '${password}', '${phone}', '${accountID}')`;
  console.log(insertQuery);
  return await secureQuery(insertQuery);
};

export const removeUser = async (id) => {
  // const insertQuery = `INSERT INTO users(username, password, phone, status) VALUES('${user}', '${password}', '${phone}', 'v')`;
  const removeQuery = isNumeric(id)
    ? `DELETE FROM users WHERE accountid = '${id}'`
    : `DELETE FROM users WHERE username = '${id}'`;

  console.log(removeQuery);

  return await secureQuery(removeQuery);
};

export const validateUser = async (username) => {
  const modifyQuery = `UPDATE users SET status = 'v' WHERE username = '${username}'`;
  return await secureQuery(modifyQuery);
};

export const getUsers = async (id) => {
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

export const addAccount = async (account) => {
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
  console.log(insertQuery);
  return await secureQuery(insertQuery);
};