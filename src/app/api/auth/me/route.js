import { NextResponse } from "next/server";
import { verify, decode } from "jsonwebtoken";
import { cookies } from "next/headers";
import { COOKIES_INFO } from "@/models/constants";
import { responseText } from "@/locales/siteText";

export const GET = async (req) => {
  const cookie = cookies().get(COOKIES_INFO.name);

  if (cookie) {
    try {
      verify(cookie.value, process.env.JWT_SECRET);
      const payload = decode(cookie.value);

      const user = {
        username: payload.username,
        accountID: payload.accountid,
      };
      return NextResponse.json(user, { status: 200 });
    } catch {
      console.log("Token invalid!");
    }
  }
  return NextResponse.json({ error: responseText.badRequest }, { status: 401 });
};
