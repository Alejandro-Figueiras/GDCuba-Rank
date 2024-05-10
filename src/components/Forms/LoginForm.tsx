'use client'
import React, {
  type MutableRefObject,
  useContext,
  useRef,
  useState
} from 'react'

import { Button } from '@nextui-org/button'

// Modals
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/modal'
import { Input } from '@nextui-org/input'
import { GlobalContext } from '@/app/context/GlobalContext'
import { notify } from '@/libs/toastNotifications'
import { login } from '@/actions/auth/login'

const LoginForm = ({
  isOpen,
  onOpenChange
}: {
  isOpen: boolean
  onOpenChange: () => void
}) => {
  const userRef = useRef() as MutableRefObject<HTMLInputElement>
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>
  const [loading, setLoading] = useState(false)
  const { setCurrentUser } = useContext(GlobalContext)

  const handleSubmitButton = async (action: string, onClose: () => void) => {
    if (action == 'submit') {
      const formData = {
        username: userRef.current.value,
        password: passwordRef.current.value
      }
      setLoading(true)

      const data = JSON.parse(await login(formData))
      setLoading(false)
      if (data.status == 'error') {
        notify(data.message, 'error')
        console.log(data.message)
        return
      }
      notify(data.message, 'success')
      setCurrentUser((prev) => ({
        ...prev,
        ...(data.user as {
          username: string
          role: string
          accountid: number
          phone: string
          sessionToken: string | number
        })
      }))
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Inicia sesión
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label='Usuario en GD'
                placeholder='Introduce tu nombre de usuario'
                variant='bordered'
                ref={userRef}
              />
              <Input
                label='Contraseña'
                placeholder='Introduce tu contraseña'
                type='password'
                variant='bordered'
                ref={passwordRef}
              />
            </ModalBody>
            <ModalFooter>
              <Button color='default' variant='flat' onPress={onClose}>
                Cerrar
              </Button>
              <Button
                color='primary'
                onPress={() => handleSubmitButton('submit', onClose)}
                isLoading={loading}
              >
                Adelante
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default LoginForm
