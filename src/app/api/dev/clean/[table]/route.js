import { consult } from "@/database/db.devFunctions";
import { cleanTable } from "@/database/db.functions";
import { NextResponse } from "next/server";

export const GET = async(req, {params}) => {
    console.log(params);
    const queryResult = await cleanTable(params.table);

    if (!queryResult.isError()) {
        return NextResponse.json(queryResult.result, {
            status: 200
        })
    }
    return NextResponse.json(queryResult.error, { status: 500});
}