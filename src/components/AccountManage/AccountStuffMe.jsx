'use client'
import { useState, useEffect } from 'react'
import {
  Button,
  useDisclosure
} from '@nextui-org/react'
import AddStuffModal from './AddStuffModal'

const AccountStuffMe = ({account, setAccount, stuffItems = [], setStuffItems}) => {
  // TODO autorizaciones
  console.log(account.stuff)
  // const stuffOrder = JSON.parse(account.stuff).map(item=>item)
  const [stuff, setStuff] = useState([])

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (<div className="flex flex-col gap-2">
    <AddStuffModal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      accountStuff={account.stuff}
      account={account}
      setAccount={setAccount}
      setStuffItems={setStuffItems}
      />
    <p>{account.stuff}</p>
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