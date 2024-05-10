'use client'
import { Button, useDisclosure } from '@nextui-org/react'
import AddStuffModal from './AddStuffModal'
import StuffBio from './Stuff/StuffBio'
import { useStuff } from './useStuff'
import {
  deleteStuffItemAction,
  updateAccountStuffAction
} from '@/actions/accounts/stuffActions'
import { notify } from '@/libs/toastNotifications'
import StuffHardest from './Stuff/StuffHardest'
import StuffCreated from './Stuff/StuffCreated'
import { type Account } from '@/models/Account'
import type StuffItem from '@/models/StuffItem'
import StuffHandlers from './Stuff/StuffHandlers'
import { type Dispatch, type SetStateAction } from 'react'
import type DictionaryObject from '@/helpers/DictionaryObject'

const AccountStuff = ({
  account,
  setAccount = () => {},
  stuffItems = [],
  setStuffItems = () => {},
  loadAccount = async () => {},
  manage = false
}: {
  account: Account
  setAccount?: Dispatch<SetStateAction<Account>>
  stuffItems: StuffItem[]
  setStuffItems?: Dispatch<SetStateAction<StuffItem[]>>
  loadAccount?: () => Promise<void>
  manage?: boolean
}) => {
  const { stuff, itemTypesLeft } = useStuff({ account, stuffItems })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleDelete = async (id: number) => {
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

  const handleSort = async (accStuff: string) => {
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

  const handlers: StuffHandlers = manage
    ? {
        handleSort,
        handleDelete,
        setStuffItems
      }
    : {}

  return (
    <div className='flex w-full flex-col gap-2'>
      <AddStuffModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        account={account}
        setAccount={setAccount}
        stuffItems={stuffItems}
        setStuffItems={setStuffItems}
      />

      <div className='flex w-full flex-col gap-2 px-4'>
        {stuff.map((value, i) => {
          if (value == undefined) return
          let { data: dataStr, id } = value
          const data = JSON.parse(dataStr) as DictionaryObject<any>
          if (data.type == 'bio') {
            return (
              <StuffBio
                itemData={data}
                key={i}
                id={id}
                handlers={handlers}
                manage={manage}
                accStuff={account.stuff}
              />
            )
          }
          if (data.type == 'hardest') {
            return (
              <StuffHardest
                itemData={data}
                key={i}
                id={id}
                handlers={handlers}
                manage={manage}
                accStuff={account.stuff}
              />
            )
          }
          if (data.type == 'created') {
            return (
              <StuffCreated
                itemData={data}
                key={i}
                id={id}
                handlers={handlers}
                manage={manage}
                accStuff={account.stuff}
              />
            )
          }

          return <p key={i}>{JSON.stringify(data)}</p>
        })}
      </div>
      {manage && itemTypesLeft != 0 && (
        <Button color='primary' onClick={onOpen}>
          Agregar Item
        </Button>
      )}
    </div>
  )
}

export default AccountStuff
