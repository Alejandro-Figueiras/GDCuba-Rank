'use server'

import { sql } from '@vercel/postgres'
import { authorize } from '@/libs/secure'

export const changeAval = async({id, aval}) => {
  if (await authorize()) {
    const result = await sql`UPDATE records SET aval=${aval} WHERE id=${id}`;
    if (result.rowCount) {
      return 1
    }
  }
  return 0;
}

export const removeRecord = async({id}) => {
  if (await authorize()) {
    const result = await sql`DELETE FROM records WHERE id=${id}`;
    if (result.rowCount) {
      return 1
    }
  }
  return 0;
}