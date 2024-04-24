'use client'

import {
  useState,
  useEffect
} from 'react'
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button
} from '@nextui-org/react'

const StuffEditModal = ({ 
  isOpen,
  onOpenChange,
  title,
  itemDataOld = {},
  Form,
  handleUpdate,
  updateListener = () => {},
  submitPreventer = () => {}
}) => {

  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [itemData, setItemData] = useState(itemDataOld)

  const clear = (itemData) => {
    setLoading(false)
    setDisabled(true)
    setItemData(itemData ? itemData : itemDataOld)
  }

  const handleSubmit = async(onClose) => {
    if (!submitPreventer(itemData)) return;
    setLoading(true)
    await handleUpdate(itemData)

    clear(itemData)
    onClose()
  }

  useEffect(() => updateListener(itemData, disabled, setDisabled), [itemData, disabled, updateListener])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {title}
            </ModalHeader>
            <ModalBody>
              <Form itemData={itemData} setItemData={setItemData} />
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

export default StuffEditModal;