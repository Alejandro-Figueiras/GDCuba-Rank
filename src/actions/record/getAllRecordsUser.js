'use server'

import { getAllRecordsUser } from "@/database/db.records"

export const getAllRecordsUserAction = async(username) => {
  return JSON.stringify(await getAllRecordsUser(username))
}