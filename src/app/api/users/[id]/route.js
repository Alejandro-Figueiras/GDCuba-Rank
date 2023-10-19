import { isNumeric } from "@/libs/utils.js";
import { getAccount, getAccountByID } from "@/robtop/getAccount";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  let account = undefined;
  if (isNumeric(id)) {
    account = await getAccountByID(parseInt(id));
  } 
  else account = await getAccount(id);

  return NextResponse.json(account, {
    status: 200,
  });
};
