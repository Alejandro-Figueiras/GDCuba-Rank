'use server'

import { getAllRecords } from "@/database/db.records";
import { authorize } from "@/libs/secure";

export const getAllRecordsAction = async() => {
  if (await authorize()) {
    return JSON.stringify(await getAllRecords())
  }
}