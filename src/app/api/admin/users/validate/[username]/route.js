import { validateUser } from "@/database/cloud/functions/db.functions";
import { authorize } from "@/libs/secure";
import { NextResponse } from "next/server";
import {responseText} from '@/locales/siteText';

export const GET = async (req, { params }) => {
  const authorized = await authorize();

  if (!authorized) {
    return NextResponse.json({ error: responseText.unauthorize }, { status: 401 });
  }

  const queryResult = await validateUser(params.username);
  if (!queryResult.isError()) {
    return NextResponse.json(
      { message: `Usuario ${params.username} validado correctamente` },
      { status: 200 }
    );
  }

  return NextResponse.json({ error: responseText.badRequest }, { status: 400 });
};
