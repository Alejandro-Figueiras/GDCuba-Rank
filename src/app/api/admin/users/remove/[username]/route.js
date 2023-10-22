import { removeUser } from "@/database/db.functions";
import { authorize } from "@/libs/secure";
import { responseText } from "@/locales/siteText";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  //   console.log(params.username);
  const authorized = await authorize();
  if (!(await authorize())) {
    return NextResponse.json({ error: responseText.unauthorize }, { status: 401 });
  }
  const queryResult = await removeUser(params.username);

  if (!queryResult.isError()) {
    let response = {
      message: `El usuario ${params.username} ha sido removido`,
      status: "success",
    };
    if (queryResult.result.rowCount != 0) {
      response = {
        message: `El usuario ${params.username} no ha sido encontrado`,
        status: "info",
      };
    }
    console.log(`User ${params.username} removed`);
    return NextResponse.json(response);
  }

  console.log(`Error at delete user ${params.username}`);
  return NextResponse.json({ error: responseText.badRequest }, { status: 400 });
};
