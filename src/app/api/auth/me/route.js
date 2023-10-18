import { NextResponse } from "next/server"
import {verify} from 'jsonwebtoken'
import {cookies} from 'next/headers'
import { COOKIES_INFO } from "@/models/constants";
import { secureQuery } from "@/database/db.functions";

export const GET = async(req) => {
    // const {gdcuba} = req.cookies;

    // console.log(gdcuba);
    const cookie = cookies().get(COOKIES_INFO.name);

    try {
        const me = verify(cookie.value, process.env.JWT_SECRET);

        const queryResult = await secureQuery(`SELECT * FROM users WHERE username ILIKE '${me.username}'`);
        if (!queryResult.isError()) {
            const user = {
                username: queryResult.getRows()[0].username,
                accountID: queryResult.getRows()[0].accountid,
            }
            return NextResponse.json(user, {status: 200});
        }
        else {
            return NextResponse.json({error: 'Someting went wrong...'}, {status: 500});

        }

    } catch(err) {
        console.error(err);
    }
    return NextResponse.json({error: 'Unauthorize'}, {status: 401});

}