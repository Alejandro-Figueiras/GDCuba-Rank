'use server'
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { COOKIES_INFO } from "@/models/constants";
import { responseText } from "@/locales/siteText";
import { getUserByAccountID } from "@/database/db.users";
import jwt from "jsonwebtoken";

export const authMe = async () => {
  const cookie = cookies().get(COOKIES_INFO.name);

  if (cookie) {
    try {
      const payload = verify(cookie.value, process.env.JWT_SECRET);
      const user = {
        username: payload.username,
        accountid: payload.accountid,
        phone: payload.phone,
        role: payload.role
      };

      if (Math.floor(Date.now() / 1000) - payload.iat > 24*60*60) {
        await revalidateToken(payload.accountid)
      }

      return JSON.stringify(user);
    } catch (err) {
      console.log(err)
      console.log("Token invalid!");
    }
  }
  return JSON.stringify({ error: responseText.badRequest, status: 401 });
};


const revalidateToken = async(accountid) => {
  const account = await getUserByAccountID({ accountid: accountid });
  const token = jwt.sign(
    {
      username: account.username,
      accountid: account.accountid,
      phone: account.phone,
      role: account.role,
    },
    process.env.JWT_SECRET,
  );
  cookies().set(COOKIES_INFO.name, token, {
    httpOnly: true, // esto es algo de privadicad pero no recuerdo que
    secure: process.env.NODE_ENV === "production", // Esto es para solo permitir su uso con protocolo ssl
    sameSite: "strict", // Permitir solo cuando se genere en un mismo dominio
    path: "/", // Esto nunca lo entendi
    maxAge: 60 * 60 * 24 * COOKIES_INFO.exp
  });
  console.log("Token revalidated")
}