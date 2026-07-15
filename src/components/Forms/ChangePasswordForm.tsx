'use client'
import { useState, useEffect } from 'react'

import {
  Button,
  Modal,
  Input,
  TextField,
  Label,
  Spinner,
  ErrorMessage
} from '@heroui/react'
import { notify } from '@/libs/toastNotifications'
import { useSesion } from '@/hooks/useSesion'
import { changePasswordAction } from '@/actions/auth/changePassword'

const ChangePasswordForm = ({
  isOpen,
  setOpen
}: {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPassword2, setNewPassword2] = useState('')
  const [newPassword2Error, setNewPassword2Error] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const { currentUser } = useSesion()

  const handleSubmitButton = async (action: string) => {
    if (action == 'submit') {
      if (!currentUser.username) {
        return
      }
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
      setOpen(false)
      setOldPassword('')
      setNewPassword('')
      setNewPassword2('')
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
    <Modal isOpen={isOpen} onOpenChange={setOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading className='flex flex-col gap-1 text-lg'>
                Cambiar contraseña
              </Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              {/* Esto esta puesto para ayudar a Google Passwords y demás Password Managers */}
              {currentUser.username && (
                <TextField className='hidden' variant='secondary'>
                  <Label>Usuario</Label>
                  <Input
                    type='user'
                    value={currentUser.username}
                    aria-hidden={true}
                    className='hidden'
                  />
                </TextField>
              )}
              <TextField
                value={oldPassword}
                onChange={setOldPassword}
                type='password'
                variant='secondary'
              >
                <Label>Contraseña antigua</Label>
                <Input placeholder='Escribe tu antigua contraseña' />
              </TextField>
              <TextField
                value={newPassword}
                onChange={setNewPassword}
                type='password'
                variant='secondary'
                className='pt-2'
              >
                <Label>Nueva contraseña</Label>
                <Input placeholder='Escribe tu contraseña nueva' />
              </TextField>
              <TextField
                value={newPassword2}
                onChange={setNewPassword2}
                isInvalid={!!newPassword2Error}
                type='password'
                variant='secondary'
                className='pt-2'
              >
                <Label>Repite la Contraseña</Label>
                <Input placeholder='Escribela de nuevo, para estar seguros' />
                <ErrorMessage>{newPassword2Error}</ErrorMessage>
              </TextField>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='tertiary' onPress={() => setOpen(false)}>
                Cerrar
              </Button>
              <Button
                onPress={() => handleSubmitButton('submit')}
                isPending={loading}
                isDisabled={disabled}
              >
                {loading ? <Spinner color='current' size='sm' /> : null}
                Adelante
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default ChangePasswordForm
