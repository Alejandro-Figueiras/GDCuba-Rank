'use server'

import { sql } from '@vercel/postgres'
import { authorize } from '@/libs/secure'

export const changeAval = async({id, aval}) => {
  if (authorize()) {
    const result = await sql`UPDATE records SET aval=${aval} WHERE id=${id}`;
    console.log(result)
    if (result.rowCount) {
      return 1
    }
  }
  return 0;
}