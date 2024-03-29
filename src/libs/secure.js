import { getUser } from "@/database/db.users";
import { COOKIES_INFO } from "@/models/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const authorize = async () => {
  const cookie = cookies().get(COOKIES_INFO.name);
  try {
    const data = verify(cookie.value, process.env.JWT_SECRET);
    const user = await getUser({user: data.username});
 
    if (user != undefined && user.role == "admin" || user.username === process.env.SUPER_USER) {
      console.log(`${user.username} Authorized`)
      return true;
    }
    console.log(`${user.username} unathorized`)
  } catch (err) {
    console.log("ERROR AT VALIDATE: ", err);
  }
  return false;
};
