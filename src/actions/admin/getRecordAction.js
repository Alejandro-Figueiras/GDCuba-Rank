'use server'

import { getAllRecords, getRecordByID } from "@/database/db.records";
import { authorize } from "@/libs/secure";

export const getRecordAction = async({id}) => {
  if (id) {
    const info = {...(await getRecordByID({id}))};
    return JSON.stringify(info);
  }
  return null;
}

export const getAllRecordsAction = async() => {
  if (await authorize()) {
    return JSON.stringify(await getAllRecords())
  }
}