'use client'
import { useState, useEffect } from 'react'
import {
  Button,
  useDisclosure
} from '@nextui-org/react'
import AddStuffModal from './AddStuffModal'
import StuffBio from './Stuff/StuffBio'
import { useStuff } from './useStuff'
import { deleteStuffItemAction, updateAccountStuffAction } from '@/actions/accounts/stuffActions'
import { notify } from '@/libs/toastNotifications'
import StuffHardest from './Stuff/StuffHardest'
import StuffCreated from './Stuff/StuffCreated'

const AccountStuff = ({account, setAccount, stuffItems = [], setStuffItems, loadAccount, manage = false}) => {
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

  const handleSort = async(accStuff) => {
    const infoToast = notify('Realizando cambios en la cuenta', 'info')
    const result = await updateAccountStuffAction({
      accountid: account.accountid,
      username: account.username,
      stuff: accStuff
    })
    
    await loadAccount()
    if (result == 1) {
      notify(`Items organizados`, 'success')
    } else {
      notify(`ERROR al ordenar el item. Error Code: ${result}`, 'error')
    }
  }

  const handlers = manage ? {
    handleSort,
    handleDelete,
    setStuffItems
  } : {}

  return (<div className="flex flex-col w-full gap-2">
    <AddStuffModal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      accountStuff={account.stuff}
      account={account}
      setAccount={setAccount}
      stuffItems={stuffItems}
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
          return <StuffBio itemData={data} key={i} id={id} handlers={handlers} manage={manage} accStuff={account.stuff}/>
        }
        if (data.type=='hardest') {
          return <StuffHardest itemData={data} key={i} id={id} handlers={handlers} manage={manage} accStuff={account.stuff}/>
        }
        if (data.type=='created') {
          return <StuffCreated itemData={data} key={i} id={id} handlers={handlers} manage={manage} accStuff={account.stuff}/>
        }
        
        return <p key={i}>{JSON.stringify(data)}</p>
      })}
    </div>
    {
      (manage && itemTypesLeft != 0) && 
      <Button
        type='priamry'
        onClick={onOpen}
      >Agregar Item</Button>
    }
    
  </div>)
}

export default AccountStuff