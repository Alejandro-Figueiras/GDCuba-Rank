import { getAccount } from "@/robtop/getAccount";
import { NextResponse } from "next/server"

export const GET = async(rea, {params}) => {
    const data = await getAccount(params.username);

    console.log(data);
    return NextResponse.json('ok', {
        status: 200
    })
}