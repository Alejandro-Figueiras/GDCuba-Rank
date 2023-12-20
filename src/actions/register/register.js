'use server'
import { hash } from "bcryptjs";
import { getAccount } from "@/robtop/getAccount";
import { responseText } from "@/locales/siteText";
import { addUser, findUser } from "@/database/db.users";
import { addGDAccount, getGDAccount } from "@/database/db.gdaccounts";

export const register = async (data) => {
  let errorMessage = "La cuenta solicitada no existe en Geometry Dash";

  let fields = {
    user: data.username,
    password: data.password,
    phone: data.phone,
    accountid: null
  };

  const accountRegistered = findUser({user: fields.user})
  if (accountRegistered == undefined) {
    const gdAccount = await getAccount(data.username);

    if (gdAccount !== -1) {
      const passwordEncrypt = await hash(fields.password, 5);
      fields.password = passwordEncrypt;
      fields.user = gdAccount.username;
      fields.accountid = gdAccount.accountid;

      const query = await addUser(fields);
      if (await getGDAccount(gdAccount)) {
        await addGDAccount({account: gdAccount});
      }
      if (query) {
        return JSON.stringify(
          { 
            message: "Usuario creado satisfactoriamente",
            status: 200
          }
        );
      } else {errorMessage = responseText.error}
    }
  } else {
    errorMessage = `La cuenta ${fields.user} ya fue solicitada`;
  }

  return JSON.stringify(
    { 
      error: errorMessage,
      status: 500
    }
  );
};