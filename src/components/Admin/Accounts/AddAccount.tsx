'use client'
import {
  getAccountAction,
  getAccountFromRobTopAction
} from '@/actions/accounts/getAccountAction'
import { Button, Modal, TextField, InputGroup } from '@heroui/react'
import { useState } from 'react'
import AccountCard from './AccountCard'
import { notify } from '@/libs/toastNotifications'
import { addNewAccountAction } from '@/actions/admin/addNewAccountAction'
import { changeCubanAction } from '@/actions/admin/accountsActions'
import { type Account } from '@/models/Account'
import SearchIcon from '@/components/Icons/SearchIcon'

const AddAccount = ({
  isOpen,
  setOpen
}: {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}) => {
  const [input, setInput] = useState('')
  const [account, setAccount] = useState(undefined as Account | undefined)

  const handleSearch = async () => {
    const newAccount = JSON.parse(
      await getAccountFromRobTopAction({ username: input })
    ) as Account
    console.log(newAccount)
    setAccount(newAccount)
  }

  const submitAccount = async ({
    account,
    cuba = false
  }: {
    account: Account
    cuba?: boolean
  }) => {
    const localStr = await getAccountAction({ username: account.username })
    if (localStr && localStr != undefined && localStr != '-1') {
      const local = JSON.parse(localStr) as Account
      if (local.cuba == 0 && cuba) {
        changeCubanAction({ username: account.username, cuba: cuba ? 1 : 0 })
          .then(() =>
            notify(
              'La cuenta ya existía, pero fue cambiada de nacionalidad',
              'success'
            )
          )
          .catch(() =>
            notify(
              'La cuenta ya exise, pero hubo un error al cambiarla de nacionalidad',
              'error'
            )
          )
      } else {
        notify('La cuenta ya está en la base de datos', 'info')
      }
    } else {
      await addNewAccountAction({ account, cuba: cuba ? 1 : 0 })
      notify('La cuenta fue agregada exitosamente', 'success')
    }
    setAccount(undefined)
    setInput('')
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setOpen}
      // scrollBehavior='inside'
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className='max-w-180'>
            <Modal.Header className='flex flex-col gap-1'>
              <Modal.Heading>Agregar cuenta</Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              <div className='flex w-full flex-row flex-wrap gap-2'>
                <TextField value={input} onChange={setInput} className='grow'>
                  <InputGroup variant='secondary' fullWidth>
                    <InputGroup.Prefix>
                      <SearchIcon />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      placeholder='GD Account Username'
                      className='h-10'
                    />
                  </InputGroup>
                </TextField>
                <Button
                  onPress={handleSearch}
                  size='lg'
                  variant='tertiary'
                  className='w-full shrink-0 sm:w-auto sm:shrink'
                >
                  Buscar
                </Button>
              </div>
              <div className='mt-6 w-full'>
                {account?.username ? (
                  <AccountCard
                    account={account}
                    submitAccount={submitAccount}
                  />
                ) : (
                  <p className='text-center'>
                    {!account ? 'No existe esta cuenta' : 'Vacío.'}
                  </p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='tertiary'
                onPress={() => {
                  setOpen(false)
                }}
              >
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default AddAccount
