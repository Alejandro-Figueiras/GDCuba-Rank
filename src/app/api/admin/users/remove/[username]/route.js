import { removeUser } from "@/database/db.functions";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
//   console.log(params.username);
  const queryResult = await removeUser(params.username);

  if (!queryResult.isError()) {
    return NextResponse.json({ message: `Usuario eliminado con éxito` });
  }
  return NextResponse.json(
    { message: `Ha ocurrido un error` },
    { status: 500 }
  );
};
