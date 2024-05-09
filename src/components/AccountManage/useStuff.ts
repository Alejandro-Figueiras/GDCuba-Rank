import { type Account } from '@/models/Account'
import type StuffItem from '@/models/StuffItem'
import { useState, useEffect } from 'react'
export const useStuff = ({
  account,
  stuffItems
}: {
  account: Account
  stuffItems: StuffItem[]
}) => {
  const [itemTypesLeft, setItemTypesLeft] = useState(0)
  const [stuff, setStuff] = useState([] as (StuffItem | undefined)[])

  useEffect(() => {
    const newItemTypes: string[] = []
    const stuffOrder = (account.stuff ?? '')
      .split(',')
      .map((id) => parseInt(id))
      .map((id) =>
        stuffItems.find((value) => {
          if (value.id == id) {
            const data = JSON.parse(value.data)
            newItemTypes.push(data.type)
            return true
          }
          return false
        })
      )

    let itemTypesLeft = 3
    if (newItemTypes.includes('bio')) itemTypesLeft--
    if (newItemTypes.includes('hardest')) itemTypesLeft--
    if (newItemTypes.includes('created')) itemTypesLeft--
    setStuff(stuffOrder)
    setItemTypesLeft(itemTypesLeft)
  }, [account, stuffItems])

  return {
    stuff,
    itemTypesLeft
  }
}
