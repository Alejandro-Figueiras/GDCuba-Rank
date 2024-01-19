'use client'
import { useState, useEffect } from 'react'
import {
  Button,
  useDisclosure
} from '@nextui-org/react'
import AddStuffModal from './AddStuffModal'
import StuffBio from './Stuff/StuffBio'
import { useStuff } from './useStuff'

const AccountStuffMe = ({account, setAccount, stuffItems = [], setStuffItems}) => {
  // TODO autorizaciones
  const {
    stuff,
    itemTypesLeft
  } = useStuff({account, stuffItems})

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
      {stuff.map(({data, id}, i)=>{
        data = JSON.parse(data)
        if (data.type=='bio') {
          return <StuffBio itemData={data} key={i} id={id} handlers={{}}/>
        }
        
        return <p key={i}>{JSON.stringify(data)}</p>
      })}
    </div>
    {
      itemTypesLeft != 0 && 
      <Button
        type='priamry'
        onClick={onOpen}
      >Agregar Item</Button>
    }
    
  </div>)
}

export default AccountStuffMe