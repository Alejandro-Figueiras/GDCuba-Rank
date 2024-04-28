'use server'

import { sql } from '@vercel/postgres'
import { authorize } from '@/libs/secure'
import { updateLandingStatsRecords } from '@/database/db.staticInfo'
import { addLog } from '@/database/db.auditorylog'
import { RECORDS_AVAL_VALUES } from '@/models/constants'

// IMPORTANTE: Debe tenerse en cuenta la actualización de la landing si ocurre algún cambio en los records

export const changeAval = async ({ id, aval }) => {
  const authResult = await authorize()
  if (authResult.can) {
    const result = await sql`UPDATE records SET aval=${aval} WHERE id=${id}`
    if (result.rowCount) {
      await addLog(
        `${authResult.username} cambió el aval del record #${id} a ${RECORDS_AVAL_VALUES[aval].value}`
      )
      await updateLandingStatsRecords()
      return 1
    }
  }
  return 0
}

export const removeRecord = async ({ id }) => {
  const authResult = await authorize()
  if (authResult.can) {
    const result = await sql`DELETE FROM records WHERE id=${id}`
    if (result.rowCount) {
      await addLog(`${authResult.username} eliminó el record #${id}`)
      await updateLandingStatsRecords()
      return 1
    }
  }
  return 0
}
