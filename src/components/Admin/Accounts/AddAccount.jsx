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
import { useRef, useState } from 'react'
import AccountCard from './AccountCard'
import { notify } from '@/libs/toastNotifications'
import { addNewAccountAction } from '@/actions/admin/addNewAccountAction'
import { changeCubanAction } from '@/actions/admin/accountsActions'

const AddAccount = ({ isOpen, onOpen, onOpenChange, onClose }) => {
  const inputRef = useRef()
  const [account, setAccount] = useState({})

  const handleSearch = async (e) => {
    const user = inputRef.current.value
    const newAccount = JSON.parse(
      await getAccountFromRobTopAction({ username: user })
    )
    console.log(newAccount)
    setAccount(newAccount)
  }

  const submitAccount = async ({ account, cuba = false }) => {
    let local = await getAccountAction({ username: account.username })
    if (local) {
      local = JSON.parse(local)
      if (local.cuba == 0 && cuba) {
        changeCubanAction({ username: account.username, cuba: cuba ? 1 : 0 })
          .then(() =>
            notify(
              'La cuenta ya existía, pero fue cambiada de nacionalidad',
              'success'
            )
          )
          .error(() =>
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
    setAccount({})
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
                  {account.username ? (
                    <AccountCard
                      account={account}
                      submitAccount={submitAccount}
                    />
                  ) : (
                    <p className='text-center'>
                      {account == -1 ? 'No existe esta cuenta' : 'Vacío.'}
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
