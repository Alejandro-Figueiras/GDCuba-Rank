import { secureQuery } from "@/database/cloud/db.functions";
import { isNumeric } from "@/libs/utils";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const query = isNumeric(params.username)
    ? `SELECT username, accountid, role, phone FROM users WHERE accountid ='${params.username}'`
    : `SELECT username, accountid, role, phone FROM users WHERE username ='${params.username}'`;
    
  const queryResult = await secureQuery(query);

  if (!queryResult.isError()) {
    return NextResponse.json(queryResult.result, {
      status: 200,
    });
  }
  return NextResponse.json(queryResult.error, { status: 400 });
};
