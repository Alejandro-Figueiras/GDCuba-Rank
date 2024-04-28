'use server'

import {
  addStuffItem,
  deleteStuffItem,
  getAllStuffItems,
  updateStuffItemData
} from '@/database/db.accstuffitems'
import { authMe } from '../auth/me'
import { updateAccountStuff } from '@/database/db.gdaccounts'

export const getStuffItemsAction = async (props) => {
  return JSON.stringify(await getAllStuffItems(props))
}

export const submitStuffItemAction = async (props) => {
  const auth = JSON.parse(await authMe({ forceRevalidate: true }))
  if (auth.username == props.username && auth.accountid == props.accountid) {
    return await addStuffItem(props)
  } else {
    return -1
  }
}

export const updateStuffItemDataAction = async (props) => {
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
}) => {
  const newStuff = []
  for (const item of stuff.split(',')) {
    if (item != id && item != '' && item != null) newStuff.push(item)
  }
  // este server action ya valida la cuenta
  const updateResult = await updateAccountStuffAction({
    accountid,
    username,
    stuff: newStuff.join(','),
    id
  })
  if (updateResult == -1) return -1
  return await deleteStuffItem(id)
}
