'use server'

import { addAccountCloud } from "./cloud/db.functions";

export const addGDAccount = async({account}) => {
  const response = await addAccountCloud(account);
  if (response.isError()) {
    throw response.error
  } else {
    return global.cache.gdaccounts[account.username] = account
  }
}

export const getGDAccount = async(username) => {
  return global.cache.gdaccounts[username]
}

export const getAllCubans = async() => {
  return Object.values(global.cache.gdaccounts);
}