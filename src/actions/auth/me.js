'use server'
import { verify, decode } from "jsonwebtoken";
import { cookies } from "next/headers";
import { COOKIES_INFO } from "@/models/constants";
import { responseText } from "@/locales/siteText";

export const authMe = async () => {
  const cookie = cookies().get(COOKIES_INFO.name);

  if (cookie) {
    try {
      verify(cookie.value, process.env.JWT_SECRET);
      const payload = decode(cookie.value);

      const user = {
        username: payload.username,
        accountid: payload.accountid,
        phone: payload.phone,
        role: payload.role
      };
      return JSON.stringify(user);
    } catch {
      console.log("Token invalid!");
    }
  }
  return JSON.stringify({ error: responseText.badRequest, status: 401 });
};
