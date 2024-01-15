'use server'

import { getAllGDAccounts } from "@/database/db.gdaccounts"
import { authorize } from "@/libs/secure"

export const getAllAccountsAction = async() => {
  if (await authorize()) {
    return JSON.stringify(await getAllGDAccounts())
  }
}