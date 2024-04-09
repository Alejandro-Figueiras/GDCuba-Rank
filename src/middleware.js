import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIES_INFO } from "./models/constants";
import { jwtVerify } from "jose";
// This function can be marked `async` if using `await` inside

export async function middleware(request) {
  const cookie = cookies().get(COOKIES_INFO.name);
  const cookieData = cookie ? cookie.value : undefined;
  let access = false;
  try {
    if (cookieData != undefined && process.env.NODE_ENV !== "development") {
      const key = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(cookieData, key);

      access =
        payload.role === "admin" ||
        payload.role === "owner";

    } else if (process.env.NODE_ENV == "development") {
      access = true;
    }
  } catch (err) {
    console.error("ERROR: ", err);
  }

  if (!access) {
    console.log("El usuario actual no tiene permsiso para acceder a esta url");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
