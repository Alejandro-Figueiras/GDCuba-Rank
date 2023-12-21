'use server'
import { authorize } from "@/libs/secure";
import {responseText} from '@/locales/siteText';
import { validateUser } from "@/database/db.users";

export const validateUserAction = async ({user, unvalidate}) => {
  const authorized = await authorize();

  if (!authorized) {
    return JSON.stringify({ 
      error: responseText.unauthorize,
      status: 401
    });
  }

  const result = await validateUser({user, unvalidate});
  if (!result) {
    return JSON.stringify(
      { 
        message: `Usuario ${params.username} validado correctamente`,
        status: 200,
        user: result
      }
    );
  }

  return JSON.stringify({ 
    error: responseText.badRequest,
    status: 400
  });
};
