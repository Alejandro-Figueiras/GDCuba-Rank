import { addColumn } from "@/database/cloud/functions/db.devFunctions";
import { secureQuery } from "@/database/cloud/functions/db.functions";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  if (process.env.NODE_ENV === "development") {
    const body = await req.json();
    // console.log(body);

    const queryResult = await secureQuery(body.query);

    if (!queryResult.isError()) {
      return NextResponse.json(queryResult, {
        status: 200,
      });
    }
  }
  return NextResponse.json(queryResult.error, {
    status: 400,
  });
};
