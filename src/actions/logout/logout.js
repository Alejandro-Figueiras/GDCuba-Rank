'use server'
import { responseText } from "@/locales/siteText";
import { COOKIES_INFO } from "@/models/constants"
import { cookies } from "next/headers"

export const logout = async() => {
    cookies().delete(COOKIES_INFO.name);
    return JSON.stringify({message: responseText.success});
}