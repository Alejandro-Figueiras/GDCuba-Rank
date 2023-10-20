import { secureQuery } from "@/database/db.functions";
import { log } from "@/helpers/log";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import { COOKIES_INFO } from "@/models/constants";
import { compare } from 'bcryptjs'
import config from "../../../../../config";

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
    if (rows.length > 0) {
      const errorInAuth = await getErrorsInAuth(rows, data);
      if (!errorInAuth) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * COOKIES_INFO.exp,
            accountid: rows[0].accountid,
          },
          process.env.JWT_SECRET
        );

        const serialized = serialize(COOKIES_INFO.name, token, {
          httpOnly: true, // esto es algo de privadicad pero no recuerdo q
          secure: process.env.NODE_ENV === "production", // Esto es para solo permitir su uso con protocolo ssl
          sameSite: "strict", // Permitir solo cuando se genere en un mismo dominio
          path: "/", // Esto nunca lo entendi xd
        });
        return NextResponse.json(
          { status: "ok", message: "Acceso permitido" },
          {
            status: 200,
            headers: { "Set-Cookie": serialized },
          }
        );
      } else {
        return NextResponse.json({
          status: "error",
          message: errorInAuth.message,
        });
      }
    } else {
      return NextResponse.json({
        status: "error",
        message: `El usuario ${data.username} no existe...`,
      });
    }
  }
  return NextResponse.json({
    status: "error",
    message: "Ha ocurrido un error",
  });
};


const getErrorsInAuth = async(rows, dataInBody) => {
  let error = null;
  // if (rows[0].status !== "v") {
  //   error = {
  //     message: "Usuario pendiente a verificación",
  //   };
  // }
  // console.log(rows[0].password);
  const match = await compare(dataInBody.password, rows[0].password);
  if (!match) {
    error = {
      message: "Contraseña incorrecta",
    };
  }
  return error;
}
