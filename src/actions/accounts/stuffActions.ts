'use server'

import {
  addStuffItem,
  deleteStuffItem,
  getAllStuffItems,
  updateStuffItemData
} from '@/database/db.accstuffitems'
import { authMe } from '../auth/me'
import { updateAccountStuff } from '@/database/db.gdaccounts'
import type StuffItem from '@/models/StuffItem'

export const getStuffItemsAction = async ({
  username,
  accountid
}: {
  username?: string
  accountid?: number
}) => {
  return JSON.stringify(await getAllStuffItems({ username, accountid }))
}

export const submitStuffItemAction = async (item: {
  accountid: number
  username: string
  data: string
}) => {
  const auth = JSON.parse(await authMe({ forceRevalidate: true }))
  if (auth.username == item.username && auth.accountid == item.accountid) {
    return await addStuffItem(item)
  } else {
    return -1
  }
}

export const updateStuffItemDataAction = async (props: StuffItem) => {
  const auth = JSON.parse(await authMe({ forceRevalidate: true }))
  if (auth.username == props.username && auth.accountid == props.accountid) {
    return await updateStuffItemData(props.id, props.data)
  } else {
    return -1
  }
}

export const updateAccountStuffAction = async ({
  accountid,
  username,
  stuff
}: {
  accountid: number
  username: string
  stuff: string
}) => {
  const auth = JSON.parse(await authMe({ forceRevalidate: true }))
  if (auth.username == username && auth.accountid == accountid) {
    return await updateAccountStuff({
      username,
      stuff: stuff
    })
  } else {
    console.log('unauthorized')
    return -1
  }
}

export const deleteStuffItemAction = async ({
  accountid,
  username,
  stuff,
  id
}: {
  accountid: number
  username: string
  stuff: string
  id: number
}) => {
  const newStuff = []
  for (const item of stuff.split(',')) {
    if (parseInt(item) != id && item != '' && item != null) newStuff.push(item)
  }
  // este server action ya valida la cuenta
  const updateResult = await updateAccountStuffAction({
    accountid,
    username,
    stuff: newStuff.join(',')
  })
  if (updateResult == -1) return -1
  return await deleteStuffItem(id)
}
