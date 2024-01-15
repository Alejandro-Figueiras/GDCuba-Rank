'use server'

import { addStuffItem, getAllStuffItems } from "@/database/db.accstuffitems"
import { authMe } from "../auth/me"

export const getStuffItemsAction = async(props) => {
  return JSON.stringify(await getAllStuffItems(props))
}

export const submitStuffItemAction = async(props) => {
  const auth = JSON.parse(await authMe());
  if (auth.username == props.username && auth.accountID == props.accountid) {
    return await addStuffItem(props)
  } else {
    return -1
  }
}