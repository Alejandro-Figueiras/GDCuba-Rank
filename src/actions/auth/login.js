"use server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { COOKIES_INFO } from "@/models/constants";
import { compare } from "bcryptjs";
import { responseText } from "@/locales/siteText";
import { findUser } from "@/database/db.users";
import { cookies } from "next/headers";

const ERROR_RESPONSE = {
  status: "error",
  message: responseText.loginError,
};

export const login = async ({ username, password }) => {
  const user = await findUser({ user: username });

  if (user) {
    const passwordMatch = await compare(password, user.password);
    if (passwordMatch) {
      const token = createToken(user);

      cookies().set(COOKIES_INFO.name, token, {
        httpOnly: true, // esto es algo de privadicad pero no recuerdo q
        secure: process.env.NODE_ENV === "production", // Esto es para solo permitir su uso con protocolo ssl
        sameSite: "strict", // Permitir solo cuando se genere en un mismo dominio
        path: "/", // Esto nunca lo entendi xd
      });

      return JSON.stringify({
        status: "ok",
        message: responseText.loginSuccess,
        ...user
      });
    }
  }
  return JSON.stringify(ERROR_RESPONSE);
};

const createToken = (account) => {
  // console.log(account);
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * COOKIES_INFO.exp,
      username: account.username,
      accountid: account.accountid,
      phone: account.phone,
      role: account.role,
      greeting: account.greeting,
      bestcreatedlevelid: account.bestcreatedlevelid,
      harderdemonid: account.harderdemonid,
    },
    process.env.JWT_SECRET
  );
};
