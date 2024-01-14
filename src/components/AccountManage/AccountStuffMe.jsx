'use client'
import { useState, useEffect } from 'react'
import {
  Button,
  Dropdown,
  useDisclosure
} from '@nextui-org/react'
import AddStuffModal from './AddStuffModal'

const AccountStuffMe = ({account, stuffItems = []}) => {
  // TODO autorizaciones
  console.log(stuffItems)
  const stuffOrder = JSON.parse(account.stufforder).map(item=>item)
  const [stuff, setStuff] = useState([])

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (<div className="flex flex-col gap-2">
    <AddStuffModal isOpen={isOpen} onOpenChange={onOpenChange} />
    <p>{account.stufforder}</p>
    {stuff.map((data, i)=>{
      return <p key={i}>{JSON.stringify(data)}</p>
    })}
    <Button
      type='priamry'
      onClick={onOpen}
    >Agregar Item</Button>
  </div>)
}

export default AccountStuffMe