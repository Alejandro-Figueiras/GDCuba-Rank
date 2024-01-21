import { useState, useEffect } from 'react'
export const useStuff = ({
  account, stuffItems
}) => {
  const [itemTypesLeft, setItemTypesLeft] = useState(0)
  const [stuff, setStuff] = useState([])
  
  useEffect(() => {
    const newItemTypes = [];
    const stuffOrder = account.stuff.split(',')
    .map(id=>parseInt(id))
    .map(id=>stuffItems.find((value, i, obj) => {
      console.log(value) 
      if (value.id == id) {
        
        const data = (value.data.type)?value.data:JSON.parse(value.data)
        newItemTypes.push(data.type)
        return true
      }
      return false
    }))

    let itemTypesLeft = 1;
    if (newItemTypes.includes('bio')) itemTypesLeft--
    setStuff(stuffOrder)
    setItemTypesLeft(itemTypesLeft)
  }, [account, stuffItems])
  

  return {
    stuff,
    itemTypesLeft
  }
}