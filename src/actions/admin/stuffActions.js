'use server'

import { getAllStuffItems } from "@/database/db.accstuffitems"

export const getStuffItemsAction = async(props) => {
  return JSON.stringify(await getAllStuffItems(props))
}