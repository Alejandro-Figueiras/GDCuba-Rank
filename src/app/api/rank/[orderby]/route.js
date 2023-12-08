import { getUsersCloud } from "@/database/cloud/db.functions";
import { responseText } from "@/locales/siteText";
import Account from "@/models/Account";
import { getAccountByID } from "@/robtop/getAccount";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const orderBy = params.orderby;

  if (isValid(orderBy)) {
    const registredPlayersQuery = await getUsersCloud("all");
    if (registredPlayersQuery != -1) {
      const registredPlayers = registredPlayersQuery.rows;
      const gdAccountsList = [];

      for (let i = 0; i < registredPlayers.length; i++) {
        const player = registredPlayers[i];
        const gdAccount = await getAccountByID(player.accountid);

        gdAccountsList.push(gdAccount);
        // gdAccount.user
      }

      const gdAccountSorted = gdAccountsList.sort(
        (a, b) => b[orderBy] - a[orderBy]
      );
      return NextResponse.json(gdAccountSorted);
    }
  }

  return NextResponse.json({ error: responseText.error }, { status: 400 });
};

const isValid = (stats) => {
  const testAccound = new Account();
  return testAccound[stats] != null;
};
