import { secureQuery } from "@/database/cloud/db.functions";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { COOKIES_INFO } from "@/models/constants";
import { compare } from 'bcryptjs'
import { responseText } from "@/locales/siteText";

const ERROR_RESPONSE = {
  status: 'error',
  message: responseText.loginError
}

export const POST = async (req, res) => {
  const body = await req.json();
  const queryResult = await secureQuery(
    `SELECT * FROM users WHERE username ILIKE '${body.username}'`
  );


  if (!queryResult.isError()) {
    const rows = queryResult.getRows();
    const userExists = rows.length > 0;
    if (userExists) {
      const passwordMatch = await compare(body.password, rows[0].password);
      if (passwordMatch) {
        const serializedToken = createAndSerializeToken(rows[0]);
        return NextResponse.json({
          status: 'ok',
          message: responseText.loginSuccess,
          username: rows[0].username,
          accountid: rows[0].accountid,
          phone: rows[0].phone,
          role: rows[0].role
        },
          {
            status: 200,
            headers: { "Set-Cookie": serializedToken },
          }
        );
      }
    }
  }
  return NextResponse.json(ERROR_RESPONSE);
};

const createAndSerializeToken = (account) => {
  const token = createToken(account);

  return serialize(COOKIES_INFO.name, token, {
    httpOnly: true, // esto es algo de privadicad pero no recuerdo q
    secure: process.env.NODE_ENV === "production", // Esto es para solo permitir su uso con protocolo ssl
    sameSite: "strict", // Permitir solo cuando se genere en un mismo dominio
    path: "/", // Esto nunca lo entendi xd
  });
}

const createToken = (account) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * COOKIES_INFO.exp,
      username: account.username,
      accountid: account.accountid,
      phone: account.phone,
      role: account.role
    },
    process.env.JWT_SECRET
  );
}