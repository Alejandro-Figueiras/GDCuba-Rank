'use server'

import { getAllRecords, getUnverifiedRecords } from "@/database/db.records";
import { authorize } from "@/libs/secure";

export const getAllRecordsAction = async() => {
  if (await authorize()) {
    return JSON.stringify(await getAllRecords())
  }
}

export const getUnverifiedRecordsAction = async() => {
  if (await authorize()) {
    return JSON.stringify(await getUnverifiedRecords())
  }
}