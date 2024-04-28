'use server'

import { getAllGDAccounts } from '@/database/db.gdaccounts'
import { authorize } from '@/libs/secure'

export const getAllAccountsAction = async () => {
  if ((await authorize()).can) {
    return JSON.stringify(await getAllGDAccounts())
  }
}
