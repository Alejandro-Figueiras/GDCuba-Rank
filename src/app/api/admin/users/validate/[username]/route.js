import { validateUser } from "@/database/db.functions";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  if (authorized()) {
    return NextResponse.json(
      { error: "Unauthorize" },
      {
        status: 401,
      }
    );
  }

  const queryResult = await validateUser(params.username);
  if (!queryResult.isError()) {
    return NextResponse.json(
      { message: `Usuario ${params.username} validado correctamente` },
      { status: 200 }
    );
  }

  return NextResponse.json({ error: "Ha ocurrido un error" }, { status: 500 });
};

const authorized = () => {
  return process.env.NODE_ENV !== "development";
};
