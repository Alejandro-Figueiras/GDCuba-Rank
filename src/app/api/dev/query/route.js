import { addColumn } from "@/database/db.devFunctions";
import { secureQuery } from "@/database/db.functions";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  // console.log(body);
  
  const queryResult = await secureQuery(body.query);


  if (!queryResult.isError()) {
    return NextResponse.json(queryResult, {
      status: 200,
    });
  }
  return NextResponse.json(queryResult.error, {
    status: 500
  });
};
