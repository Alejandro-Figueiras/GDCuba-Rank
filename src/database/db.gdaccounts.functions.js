'use server'
import { sql } from '@vercel/postgres'
import { getAccountByID } from "@/robtop/getAccount.js";

// Aqui se encuentran las funciones extensas 
// para no tener un archivo de accounts tan largo

export const addAccountCloud = async (account, cuba = 0) => {
  const result = await sql`INSERT INTO gdaccounts (
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
      moons,
      creatorpoints,
      modlevel,

      playercolor,
      playercolor2,
      playercolor3,
      accicon,
      accship,
      accball,
      accbird,
      accwave,
      accrobot,
      accglow,
      accspider,
      accexplosion,
      accswing,
      accjetpack,

      friendsrqstate,
      messagestate,
      friendstate,
      commenthistorystate,

      youtube,
      twitter,
      twitch,
      timestamp,
      cuba
    ) VALUES(
      ${account.username},
      ${account.userid},
      ${account.accountid},
      ${account.isregistered},

      ${account.stars},
      ${account.demons},
      ${account.secretcoins},
      ${account.usercoins},
      ${account.globalrank},
      ${account.diamonds},
      ${account.moons},
      ${account.creatorpoints},
      ${account.modlevel},

      ${account.playercolor},
      ${account.playercolor2},
      ${account.playercolor3},
      ${account.accicon},
      ${account.accship},
      ${account.accball},
      ${account.accbird},
      ${account.accwave},
      ${account.accrobot},
      ${account.accglow},
      ${account.accspider},
      ${account.accexplosion},
      ${account.accswing},
      ${account.accjetpack},

      ${account.friendsrqstate},
      ${account.messagestate},
      ${account.friendstate},
      ${account.commenthistorystate},

      ${account.youtube},
      ${account.twitter},
      ${account.twitch},
      ${account.timestamp},
      ${cuba}
    )`;
  return result;
};

export const updateAccountCloud = async(id) => {
  const account = await getAccountByID(id);
  if (account == -1) {
    console.log("ERROR en updateAccount, getAccountByID devuelve -1")
    return
  }
  const result = await sql`UPDATE gdaccounts SET
    username = ${account.username},
    userid = ${account.userid},

    stars = ${account.stars},
    demons = ${account.demons},
    secretcoins = ${account.secretcoins},
    usercoins = ${account.usercoins},
    globalrank = ${account.globalrank},
    diamonds = ${account.diamonds},
    moons = ${account.moons},
    creatorpoints = ${account.creatorpoints},
    modlevel = ${account.modlevel},
    playercolor = ${account.playercolor},
    playercolor2 = ${account.playercolor2},
    playercolor3 = ${account.playercolor3},
    accicon = ${account.accicon},
    accship = ${account.accship},
    accball = ${account.accball},
    accbird = ${account.accbird},
    accwave = ${account.accwave},
    accrobot = ${account.accrobot},
    accglow = ${account.accglow},
    accspider = ${account.accspider},
    accexplosion = ${account.accexplosion},
    accswing = ${account.accswing},
    accjetpack = ${account.accjetpack},
    friendsrqstate = ${account.friendsrqstate},
    messagestate = ${account.messagestate},
    friendstate = ${account.friendstate},
    commenthistorystate = ${account.commenthistorystate},
    youtube = ${account.youtube},
    twitter = ${account.twitter},
    twitch = ${account.twitch},
    timestamp = ${account.timestamp}
   WHERE accountid = ${id}`;
  // TODO si el usuario se cambia el nombre actualizar
  return 1;
}