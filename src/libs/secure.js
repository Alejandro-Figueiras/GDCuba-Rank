import { getUsers } from "@/database/cloud/db.functions";
import { COOKIES_INFO } from "@/models/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const authorize = async () => {
  const cookie = cookies().get(COOKIES_INFO.name);
  try {
    const data = verify(cookie.value, process.env.JWT_SECRET);
    const user = await getUsers(data.accountid);
 
    if (user != -1 && user.rows.length > 0 && user.rows[0].role == "admin" || user.rows[0].username === process.env.SUPER_USER) {
      return true;
    }
  } catch (err) {
    console.log("ERROR AT VALIDATE: ", err);
  }
  return false;
};
