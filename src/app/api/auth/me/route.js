import { NextResponse } from "next/server"
import {verify} from 'jsonwebtoken'
import {cookies} from 'next/headers'
import { COOKIES_INFO } from "@/models/constants";
import { secureQuery } from "@/database/db.functions";
import { responseText } from "@/locales/siteText";

export const GET = async(req) => {
    // const {gdcuba} = req.cookies;

    // console.log(gdcuba);
    const cookie = cookies().get(COOKIES_INFO.name);

    if (cookie) {
        const me = verify(cookie.value, process.env.JWT_SECRET);

        const queryResult = await secureQuery(`SELECT * FROM users WHERE accountid = '${me.accountid}'`);
        if (!queryResult.isError() && queryResult.getRows().length > 0) {
            const user = {
                username: queryResult.getRows()[0].username,
                accountID: queryResult.getRows()[0].accountid,
            }
            return NextResponse.json(user, {status: 200});
        }
        else {
            return NextResponse.json({error: responseText.badRequest}, {status: 400});

        }

    } 
    return NextResponse.json({error: responseText.badRequest}, {status: 401});

}