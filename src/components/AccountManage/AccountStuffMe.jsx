'use client'
import { useState, useEffect } from 'react'
import {
  Button,
  useDisclosure
} from '@nextui-org/react'
import AddStuffModal from './AddStuffModal'
import StuffText from './Stuff/StuffText'

const AccountStuffMe = ({account, setAccount, stuffItems = [], setStuffItems}) => {
  // TODO autorizaciones
  const stuffOrder = account.stuff.split(',')
    .map(id=>parseInt(id))
    .map(id=>stuffItems.find((value, i, obj) => {
      if (value.id == id) return true
      return false
    }))
  const [stuff, setStuff] = useState(stuffOrder)

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
    
    <div className="flex flex-col gap-2">
      {stuff.map(({data}, i)=>{
        data = JSON.parse(data)
        if (data.type=='bio') {
          return <StuffText itemData={data} key={i}/>
        }
        
        return <p key={i}>{JSON.stringify(data)}</p>
      })}
    </div>
    <Button
      type='priamry'
      onClick={onOpen}
    >Agregar Item</Button>
  </div>)
}

export default AccountStuffMe