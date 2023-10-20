import { addUser, secureQuery } from "@/database/db.functions";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { getAccount } from "@/robtop/getAccount";

export const POST = async (req) => {
  const data = await req.json();

  let errorMessage = "La cuenta solicitada no existe en Geometry Dash";

  let fields = {
    user: data.username,
    password: data.password,
    phone: data.phone,
    accountID: null
  };

  const accountRegistered =
    (
      await secureQuery(`SELECT * FROM users WHERE username = '${fields.user}'`)
    ).getRows().length !== 0;
  console.log("Cuenta registrada: ", accountRegistered);
  if (!accountRegistered) {
    const gdAccount = await getAccount(data.username);

    if (gdAccount !== -1) {
      const passwordEncrypt = await hash(fields.password, 5);
      fields.password = passwordEncrypt;
      fields.accountID = gdAccount.accountID;

      // console.log("data: ", fields);
      const query = await addUser(fields);

      if (!query.isError()) {
        return NextResponse.json(
          { message: "Usuario creado satisfactoriamente" },
          {
            status: 200,
          }
        );
      } else {errorMessage = 'Ha ocurrido un error...'}
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
