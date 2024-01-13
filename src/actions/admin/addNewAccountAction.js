'use server'
import { addGDAccount } from "@/database/db.gdaccounts"
import { authorize } from "@/libs/secure"

export const addNewAccountAction = async({account, cuba = 0}) => {
  if (account && await authorize()) {
    return JSON.stringify(await addGDAccount({account, cuba}))
  }
}