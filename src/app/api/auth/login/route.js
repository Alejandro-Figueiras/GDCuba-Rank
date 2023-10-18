import { secureQuery } from "@/database/db.functions";
import { log } from "@/helpers/log";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import { COOKIES_INFO } from "@/models/constants";

export const GET = async (req, { params }) => {
  const data = await secureQuery("SELECT * FROM users");
  console.log(data.result);
  console.log(data.error);
  return NextResponse.json("Pan" + params.name);
};

export const POST = async (req, res) => {
  const data = await req.json();
  const queryResult = await secureQuery(
    `SELECT * FROM users WHERE username ILIKE '${data.username}'`
  );

  if (!queryResult.isError()) {
    const rows = queryResult.getRows();
    if (rows.length > 0 && rows[0].password == data.password) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          username: data.username,
        },
        process.env.JWT_SECRET
      );

      const serialized = serialize(COOKIES_INFO.name, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      return NextResponse.json({status: "ok", message: 'Acceso permitido'},
        {
          status: 200,
          headers: { "Set-Cookie": serialized },
        }
      );
    }
  }
  return NextResponse.json({
    status: "error",
    message: "Usuario o contraseña incorrecta",
  });
};
