'use client'
import React, { useState, useEffect } from 'react'

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
import { notify } from '@/libs/toastNotifications'
import { useSesion } from '@/hooks/useSesion'
import { changePasswordAction } from '@/actions/auth/changePassword'

const ChangePasswordForm = ({ isOpen, onOpenChange }) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPassword2, setNewPassword2] = useState('')
  const [newPassword2Error, setNewPassword2Error] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const { currentUser } = useSesion()

  const handleSubmitButton = async (action, onClose) => {
    if (action == 'submit') {
      const formData = {
        username: currentUser.username,
        oldPassword,
        newPassword
      }
      setLoading(true)

      const data = JSON.parse(await changePasswordAction(formData))
      setLoading(false)
      if (data.status == 'error') {
        notify(data.message, 'error')
        console.log(data.message)
        return
      }
      notify(data.message, 'success')
      onClose()
    }
  }

  useEffect(() => {
    if (
      newPassword == '' ||
      newPassword.length < 4 ||
      newPassword2 == '' ||
      newPassword2.length < 4
    ) {
      setNewPassword2Error('')
      setDisabled(true)
    } else if (newPassword != newPassword2) {
      setNewPassword2Error('Las contraseñas no coinciden')
      setDisabled(true)
    } else {
      setNewPassword2Error('')
      setDisabled(false)
    }
  }, [newPassword, newPassword2])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Cambiar contraseña
            </ModalHeader>
            <ModalBody>
              {/* Esto esta puesto para ayudar a Google Passwords y demás Password Managers */}
              {currentUser.username && (
                <Input
                  label='Usuario'
                  type='user'
                  variant='bordered'
                  value={currentUser.username}
                  aria-hidden={true}
                  className='hidden'
                />
              )}
              <Input
                label='Contraseña antigua'
                type='password'
                variant='bordered'
                onValueChange={(value) => {
                  setOldPassword(value)
                }}
              />
              <Input
                label='Nueva Contraseña'
                type='password'
                variant='bordered'
                onValueChange={(value) => {
                  setNewPassword(value)
                }}
              />
              <Input
                label='Repite la Contraseña'
                type='password'
                variant='bordered'
                onValueChange={(value) => {
                  setNewPassword2(value)
                }}
                errorMessage={newPassword2Error}
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
                isDisabled={disabled}
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

export default ChangePasswordForm
