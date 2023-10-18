import { NextResponse } from "next/server"

export const GET = (req, {params}) => {
    return NextResponse.json('Pan' + params.id);
}