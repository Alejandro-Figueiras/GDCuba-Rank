"use server";
import { secureQuery } from "@/database/cloud/db.functions";
import { getGDAccount } from "@/database/db.gdaccounts";
import { authorize } from "@/libs/secure";
import { getAccount } from "@/robtop/getAccount";

export const degQuery = async ({ query }) => {
  console.log(query);

  if (authorize()) {
    const response = await secureQuery(query);
    return JSON.stringify(response);
  }
};
