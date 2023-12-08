import { consult } from "@/database/cloud/db.devFunctions";
import { NextResponse } from "next/server";

export const GET = async(req, {params}) => {
    console.log(params);
    const queryResult = await consult(params.table);

    if (!queryResult.isError()) {
        return NextResponse.json(queryResult.result, {
            status: 200
        })
    }
    return NextResponse.json(queryResult.error, { status: 500});
}