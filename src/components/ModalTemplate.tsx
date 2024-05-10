import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { useState } from 'react'

const ModalTemplate = ({
  isOpen,
  onOpenChange,
  title = '',
  action,
  desc = '',
  submit = () => {}
}: {
  isOpen: boolean
  onOpenChange: () => void
  title?: string
  action?: 'delete' | 'validate' | string
  desc?: string
  submit: () => Promise<void> | void
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const onOpen = () => {
    onOpenChange()
    setIsLoading(false)
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpen} placement='top-center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              <h2
                className={
                  action != 'delete'
                    ? action != 'validate'
                      ? 'text-blue-500'
                      : 'text-green-500'
                    : 'text-red-500'
                }
              >
                {title}
              </h2>
            </ModalHeader>
            <ModalBody>{desc}</ModalBody>
            <ModalFooter>
              <Button
                isLoading={isLoading}
                color={
                  action != 'delete'
                    ? action != 'validate'
                      ? 'primary'
                      : 'success'
                    : 'danger'
                }
                onPress={async (e) => {
                  setIsLoading(true)
                  await submit()

                  setIsLoading(false)
                  onClose()
                }}
              >
                <span className='text-white'>{translate(action)}</span>
              </Button>
              <Button color='default' variant='flat' onPress={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

const translate = (action: string | undefined) => {
  switch (action) {
    case 'delete':
      return 'Funar'
    case 'validate':
      return 'Validar'
    default:
      return 'Aceptar'
  }
}

export default ModalTemplate
