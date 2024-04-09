'use server'

import { changeUserRole } from "@/database/db.users";
import { authorize } from "@/libs/secure";
import {responseText} from '@/locales/siteText';

export const changeUserRoleAction = async ({user, role}) => {
  const authorized = await authorize({owner: true});

  if (!authorized) {
    return JSON.stringify({ 
      error: responseText.unauthorize,
      status: 401
    });
  }

  const result = await changeUserRole({user, role});
  if (!result) {
    return JSON.stringify(
      { 
        message: `Usuario ${params.username} ahora es ${role}`,
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