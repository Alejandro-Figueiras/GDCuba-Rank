'use server'

import { addStuffItem, getAllStuffItems } from "@/database/db.accstuffitems"
import { authMe } from "../auth/me"
import { updateAccountStuff } from "@/database/db.gdaccounts"

export const getStuffItemsAction = async(props) => {
  return JSON.stringify(await getAllStuffItems(props))
}

export const submitStuffItemAction = async(props) => {
  const auth = JSON.parse(await authMe());
  if (auth.username == props.username && auth.accountid == props.accountid) {
    return await addStuffItem(props)
  } else {
    return -1
  }
}

export const updateAccountStuffAction = async({accountid, username, stuff}) => {
  const auth = JSON.parse(await authMe());
  if (auth.username == username && auth.accountid == accountid) {
    return await updateAccountStuff({
      username,
      stuff: stuff
    })
  } else {
    console.log("unauthorized")
    return -1
  }
}