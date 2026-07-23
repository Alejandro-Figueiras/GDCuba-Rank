'use client'
import { useContext, useState } from 'react'
import { Button, Modal, Input, TextField, Label, Spinner } from '@heroui/react'
import { GlobalContext } from '@/app/context/GlobalContext'
import { notify } from '@/libs/toastNotifications'
import { login } from '@/actions/auth/login'

const LoginForm = ({
  isOpen,
  setOpen
}: {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  // TODO loading
  const [loading, setLoading] = useState(false)
  const { setCurrentUser } = useContext(GlobalContext)

  const handleSubmitButton = async (action: string, onClose: () => void) => {
    if (action == 'submit') {
      const formData = {
        username: user,
        password: password
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
    <Modal isOpen={isOpen} onOpenChange={setOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header className='flex flex-row items-center justify-between'>
              <Modal.Heading className='text-lg'>Inicia sesión</Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body className='flex flex-col gap-4'>
              <TextField value={user} onChange={setUser}>
                <Label>Usuario en GD</Label>
                <Input
                  autoFocus
                  placeholder='Introduce tu nombre de usuario'
                  className='bordered-input'
                />
              </TextField>
              <TextField value={password} onChange={setPassword}>
                <Label>Contraseña</Label>
                <Input
                  placeholder='Introduce tu contraseña'
                  type='password'
                  className='bordered-input'
                />
              </TextField>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='tertiary' onPress={() => setOpen(false)}>
                Cerrar
              </Button>
              <Button
                // color='primary'
                onPress={() =>
                  handleSubmitButton('submit', () => setOpen(false))
                }
                isPending={loading}
              >
                {loading && <Spinner color='current' size='sm' />}
                Adelante
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default LoginForm
