import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { getAccount } from "@/robtop/getAccount";
import { responseText } from "@/locales/siteText";
import { addUser, findUser } from "@/database/db.users";
import { addGDAccount } from "@/database/db.gdaccounts";

export const POST = async (req) => {
  const data = await req.json();

  let errorMessage = "La cuenta solicitada no existe en Geometry Dash";

  let fields = {
    user: data.username,
    password: data.password,
    phone: data.phone,
    accountid: null
  };

  const accountRegistered = findUser({user: fields.user})
  console.log("Cuenta registrada: ", accountRegistered);
  if (accountRegistered == undefined) {
    const gdAccount = await getAccount(data.username);

    if (gdAccount !== -1) {
      const passwordEncrypt = await hash(fields.password, 5);
      fields.password = passwordEncrypt;
      fields.user = gdAccount.username;
      fields.accountid = gdAccount.accountid;

      // console.log("data: ", fields);
      const query = await addUser(fields);
      // TODO comprobar si esta en la db
      const queryGD = await addGDAccount({account: gdAccount});
      if (query) {
        return NextResponse.json(
          { message: "Usuario creado satisfactoriamente" },
          {
            status: 200,
          }
        );
      } else {errorMessage = responseText.error}
    }
  } else {
      errorMessage = `La cuenta ${fields.user} ya fue solicitada`;
  }

  return NextResponse.json(
    { error: errorMessage },
    {
      status: 500,
    }
  );
};
