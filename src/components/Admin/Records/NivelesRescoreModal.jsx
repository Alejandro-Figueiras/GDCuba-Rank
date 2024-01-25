'use client'

import {
  useState,
} from 'react'
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button
} from '@nextui-org/react'

const NivelesRescoreModal = ({ isOpen, onOpenChange, level, levels}) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const clear = () => {
    setLoading(false)
    setDisabled(true)
  }

  const handleSubmit = async(onClose) => {
    setLoading(true)
    // await handleUpdate(itemData)

    clear()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Reposicionar nivel
            </ModalHeader>
            <ModalBody>
              Coming Soon
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="flat"
                onPress={() => {
                  clear()
                  onClose()
                }}
              >
                Cerrar
              </Button>
              <Button
                color="primary"
                onPress={() => {handleSubmit(onClose)}}
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

export default NivelesRescoreModal;