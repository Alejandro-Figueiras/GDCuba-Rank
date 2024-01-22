'use client'
import { useState, useEffect } from 'react'
import {
  Button,
  useDisclosure
} from '@nextui-org/react'
import AddStuffModal from './AddStuffModal'
import StuffBio from './Stuff/StuffBio'
import { useStuff } from './useStuff'
import { deleteStuffItemAction } from '@/actions/accounts/stuffActions'
import { notify } from '@/libs/toastNotifications'

const AccountStuffMe = ({account, setAccount, stuffItems = [], setStuffItems, loadAccount}) => {
  // TODO autorizaciones
  const {
    stuff,
    itemTypesLeft
  } = useStuff({account, stuffItems})

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const handleDelete = async(id) => {
    const infoToast = notify('Realizando cambios en la cuenta', 'info')
    const result = await deleteStuffItemAction({
      accountid: account.accountid,
      username: account.username,
      stuff: account.stuff,
      id
    })
    
    await loadAccount()
    if (result == 1) {
      notify(`Item eliminado satisfactoriamente`, 'success')
    } else {
      notify(`ERROR al eliminar el item. Error Code: ${result}`, 'error')
    }
  }

  const handlers = {
    handleDelete,
    setStuffItems
  }

  return (<div className="flex flex-col gap-2">
    <AddStuffModal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      accountStuff={account.stuff}
      account={account}
      setAccount={setAccount}
      setStuffItems={setStuffItems}
      />
    
    <div className="flex flex-col w-full gap-2 px-4">
      {stuff.map((value, i)=>{
        if (value == undefined) return;
        let {data, id} = value
        if (!value.data.type) {
          data = JSON.parse(data)
        }
        if (data.type=='bio') {
          return <StuffBio itemData={data} key={i} id={id} handlers={handlers}/>
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