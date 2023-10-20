import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIES_INFO } from "./models/constants";
import { jwtVerify } from "jose";
import generalConfig from "../config";
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const cookie = cookies().get(COOKIES_INFO.name).value;
  let access = false;
  try {
    const key = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(cookie, key);

    const response = await fetch(
      generalConfig.apiURL + `/database/users/${payload.accountid}`
    );
    const data = await response.json();
    const currentUser = data.rows[0];
    
    access = currentUser.role === 'admin' || currentUser.username === process.env.SUPER_USER;

  } catch (err) {
    console.error("ERROR: ", err);
  }

  if (!access) {
    console.log('El usuario actual no tiene permsiso para acceder a esta url');
    return NextResponse.redirect(new URL("/", request.url));
  } 
  
  return NextResponse.next();
  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
