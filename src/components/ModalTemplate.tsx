import { Button, Modal, Spinner } from '@heroui/react'
import { useState } from 'react'

const ModalTemplate = ({
  isOpen,
  setOpen,
  title = '',
  action,
  desc = '',
  submit = () => {}
}: {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  title?: string
  action?: 'delete' | 'validate' | string
  desc?: string
  submit: () => Promise<void> | void
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const onOpen = (isOpen: boolean) => {
    setOpen(isOpen)
    setIsLoading(false)
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpen}>
      <Modal.Backdrop isDismissable={!isLoading}>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header className='flex flex-col gap-1'>
              <Modal.Heading
                className={`text-lg font-semibold ${
                  action != 'delete'
                    ? action != 'validate'
                      ? 'text-blue-500'
                      : 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {title}
              </Modal.Heading>
              <Modal.CloseTrigger isDisabled={isLoading} />
            </Modal.Header>
            <Modal.Body className='text-foreground py-4 text-base'>
              {desc}
            </Modal.Body>
            <Modal.Footer>
              <Button
                isPending={isLoading}
                variant={action === 'delete' ? 'danger' : 'primary'}
                className={action === 'validate' ? 'bg-green-700' : undefined}
                onPress={async () => {
                  setIsLoading(true)
                  await submit()

                  setIsLoading(false)
                  setOpen(false)
                }}
              >
                {isLoading && <Spinner color='current' size='sm' />}\
                <span className='text-white'>{translate(action)}</span>
              </Button>
              <Button
                isDisabled={isLoading}
                variant='tertiary'
                onPress={() => onOpen(false)}
              >
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
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
