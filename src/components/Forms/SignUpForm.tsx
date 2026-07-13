'use client'
import { useEffect, useState } from 'react'

import {
  Modal,
  Button,
  TextField,
  Input,
  Label,
  FieldError
} from '@heroui/react'
import { notify } from '@/libs/toastNotifications'
import { register } from '@/actions/register/register'

const phoneRegex = /^\+[0-9\s]+$/

const SignUpForm = ({
  isOpen,
  setOpen
}: {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}) => {
  const [fieldsError, setFieldsError] = useState({
    userField: false,
    notMatchPassword: false,
    phoneInvalid: false
  })

  const [canSubmit, setCanSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [passwordSecure, setPasswordSecure] = useState('')

  useEffect(() => {
    const userCheck = () => {
      if (user.length === 0) {
        setFieldsError((prev) => ({
          ...prev,
          userField: false
        }))
        return false
      } else
        setFieldsError((prev) => ({
          ...prev,
          userField: false
        }))
      return true
    }

    const passwordCheck = () => {
      if (password.length === 0 && passwordSecure.length === 0) {
        setFieldsError((prev) => ({
          ...prev,
          notMatchPassword: false
        }))
        return false
      }

      if (password !== passwordSecure) {
        setFieldsError((prev) => ({
          ...prev,
          notMatchPassword: true
        }))
        return false
      } else
        setFieldsError((prev) => ({
          ...prev,
          notMatchPassword: false
        }))
      return true
    }

    const phoneCheck = () => {
      if (!phoneRegex.test(phone)) {
        setFieldsError((prev) => ({
          ...prev,
          phoneInvalid: phone.length > 0
        }))
        return false
      } else
        setFieldsError((prev) => ({
          ...prev,
          phoneInvalid: false
        }))
      return true
    }

    const validUser = userCheck()
    const validPhone = phoneCheck()
    const validPw = passwordCheck()
    setCanSubmit(validPw && validUser && validPhone)
  }, [phone, password, passwordSecure, user?.length])

  const handleSubmit = async () => {
    setCanSubmit(false)
    setIsLoading(true)
    const formData = {
      username: user,
      phone: phone,
      password: password
    }

    const data = JSON.parse(await register(formData))
    console.log(data)

    if (data.status == 200) {
      notify(data.message, 'success')
      setOpen(false)
    } else {
      notify(data.error, 'error')
    }

    setCanSubmit(true)
    setIsLoading(false)
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={setOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header className='flex flex-col gap-1'>
              <Modal.Heading className='text-lg'>Registrarse</Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body className='flex flex-col gap-4'>
              <TextField
                value={phone}
                onChange={setPhone}
                isRequired
                isInvalid={fieldsError.phoneInvalid}
              >
                <Label>Número de Teléfono</Label>
                <Input
                  autoFocus
                  placeholder='Ej: +53 51234567'
                  className='bordered-input'
                  type='phone'
                />
                {fieldsError.phoneInvalid && (
                  <FieldError>Número de telefono inválido</FieldError>
                )}
              </TextField>
              <TextField
                value={user}
                onChange={setUser}
                isRequired
                isInvalid={fieldsError.userField}
              >
                <Label>Usuario en GD</Label>
                <Input
                  placeholder='Introduce tu nombre de usuario'
                  className='bordered-input'
                />
                {fieldsError.userField && (
                  <FieldError>Este campo no puede estar vacio</FieldError>
                )}
              </TextField>
              <TextField value={password} onChange={setPassword}>
                <Label>Contraseña</Label>
                <Input
                  placeholder='Introduce tu contraseña'
                  className='bordered-input'
                  type='password'
                />
              </TextField>
              <TextField
                value={passwordSecure}
                onChange={setPasswordSecure}
                isRequired
                isInvalid={fieldsError.notMatchPassword}
              >
                <Label>Repite la Contraseña</Label>
                <Input
                  placeholder='Introduce tu contraseña otra vez, para estar seguros'
                  className='bordered-input'
                  type='password'
                />
                {fieldsError.notMatchPassword && (
                  <FieldError>Las contraseñas no coinciden</FieldError>
                )}
              </TextField>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='tertiary' onPress={() => setOpen(false)}>
                Cerrar
              </Button>
              <Button
                isPending={isLoading}
                isDisabled={!canSubmit}
                onPress={() => canSubmit && handleSubmit()}
              >
                Registrarse
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default SignUpForm
