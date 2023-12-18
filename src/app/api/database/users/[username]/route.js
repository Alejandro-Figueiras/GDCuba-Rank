import { secureQuery } from "@/database/cloud/db.functions";
import { dbExists } from "@/database/db.init";
import { getUser } from "@/database/db.users";
import { isNumeric } from "@/libs/utils";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  if (!(await dbExists())) {
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
  } else {
    const user = await getUser({user: username})
    if (user) {
      return NextResponse.json(user, {status: 200})
    }
    return NextResponse.json({error: 'undefined'}, {status: 400});
  }
};
