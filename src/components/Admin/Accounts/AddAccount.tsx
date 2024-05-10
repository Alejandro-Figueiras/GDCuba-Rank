'use client'
import {
  getAccountAction,
  getAccountFromRobTopAction
} from '@/actions/accounts/getAccountAction'
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/react'
import { type MutableRefObject, useRef, useState } from 'react'
import AccountCard from './AccountCard'
import { notify } from '@/libs/toastNotifications'
import { addNewAccountAction } from '@/actions/admin/addNewAccountAction'
import { changeCubanAction } from '@/actions/admin/accountsActions'
import { type Account } from '@/models/Account'

const AddAccount = ({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>
  const [account, setAccount] = useState(undefined as Account | undefined)

  const handleSearch = async () => {
    const user = inputRef.current.value as string
    const newAccount = JSON.parse(
      await getAccountFromRobTopAction({ username: user })
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
    inputRef.current.value = ''
  }

  return (
    <Modal size='xl' isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Agregar cuenta
            </ModalHeader>
            <ModalBody>
              <div className='w-100 m-4'>
                <div className='flex flex-row justify-center gap-2 align-middle'>
                  <Input
                    size='sm'
                    type='text'
                    label='GD Account Username'
                    className='w-96'
                    ref={inputRef}
                  />
                  <Button
                    size='lg'
                    className='rounded-md'
                    onClick={handleSearch}
                  >
                    Buscar
                  </Button>
                </div>
                <div className='w-100 mt-6'>
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
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color='default' variant='flat' onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default AddAccount
