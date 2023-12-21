'use server'
import { eliminarUser } from "@/database/db.users";
import { authorize } from "@/libs/secure";
import { responseText } from "@/locales/siteText";

export const removeUserAction = async ({username}) => {
  if (!(await authorize()) || !username) {
    return JSON.stringify({ 
      error: responseText.unauthorize,
      status: 401
     });
  }
  try {
    console.log(username)
    const result = await eliminarUser({username});
  
    if (result != undefined) {
      let response = {
        message: `El usuario ${username} ha sido removido`,
        status: "success",
      };
      if (result == 0) {
        response = {
          message: `El usuario ${username} no ha sido encontrado`,
          status: "info",
        };
      }
      console.log(`User ${username} removed`);
      return JSON.stringify(response);
    }
    return JSON.stringify({ 
      error: responseText.badRequest,
      status: 400
    })
  } catch (e) {
    console.log(`Error at delete user ${username}`);
    console.log(e)
    return JSON.stringify({ 
      error: responseText.badRequest,
      status: 400
    });
  }
};
