import { responseText } from "@/locales/siteText";
import { COOKIES_INFO } from "@/models/constants"
import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export const GET = () => {
    cookies().delete(COOKIES_INFO.name);
    return NextResponse.json({message: responseText.success});
}