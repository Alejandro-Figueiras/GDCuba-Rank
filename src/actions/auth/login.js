"use server";
import jwt from "jsonwebtoken";
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
      if (user.status == 'b') {
        return JSON.stringify({
          status: "error",
          message: responseText.bannedAccount,
        });
      } else if (user.status == 'u') {
        return JSON.stringify({
          status: "error",
          message: responseText.unverifiedAccount,
        });
      }

      const token = createToken(user);
      console.log(token)

      cookies().set(COOKIES_INFO.name, token, {
        httpOnly: true, // esto es algo de privadicad pero no recuerdo que
        secure: process.env.NODE_ENV === "production", // Esto es para solo permitir su uso con protocolo ssl
        sameSite: "strict", // Permitir solo cuando se genere en un mismo dominio
        path: "/", // Esto nunca lo entendi xd
        maxAge: 60 * 60 * 24 * COOKIES_INFO.exp
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
  return jwt.sign(
    {
      username: account.username,
      accountid: account.accountid,
      phone: account.phone,
      role: account.role,
    },
    process.env.JWT_SECRET,
  );
};
