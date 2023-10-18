import { secureQuery } from "@/database/db.functions";
import { log } from "@/helpers/log";
import { NextResponse } from "next/server"

export const GET = async(req, {params}) => {
    const data = await secureQuery('SELECT * FROM users');
    console.log(data.result);
    console.log(data.error);
    return NextResponse.json('Pan' + params.name);
}

export const POST = async(req, {params}) => {
    const data = await req.json();
    const queryResult = await secureQuery(`SELECT * FROM users WHERE username ILIKE '${data.username}'`);

    if (!queryResult.isError()){
        const rows = queryResult.getRows();
        if (rows.length > 0) {
            return NextResponse.json({
                status:'ok',
            })
        }

    }
    return NextResponse.json({
        status: 'error',
        message: 'Usuario o contraseña incorrecta'
    });
}