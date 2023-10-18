import { addColumn } from "@/database/db.devFunctions";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const result = await addColumn();

  if (!result.isError()) {
    return NextResponse.json(result.result, {
      status: 200,
    });
  }
  return NextResponse.json(result.error, {
    status: 401
  });
};
