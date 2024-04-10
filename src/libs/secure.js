import { getUser } from "@/database/db.users";
import { COOKIES_INFO } from "@/models/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const authorize = async ({owner = false} = {}) => {
  const cookie = cookies().get(COOKIES_INFO.name);
  let user = {};
  try {
    const data = verify(cookie.value, process.env.JWT_SECRET);
    user = await getUser({user: data.username});
 
    if (
      user != undefined && 
      (user.role == "admin" || user.role == 'owner') && 
      ((owner && user.role == 'owner') || !owner)
    ) {
      console.log(`${user.username} Authorized`)
      return {
        username: user.username,
        role: user.role,
        can: true
      };
    }
    console.log(`${user.username} unathorized`)
  } catch (err) {
    console.log("ERROR AT VALIDATE: ", err);
  }
  return {
    username: user.username,
    role: user.role,
    can: false
  };
};
