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
import StuffBioForm from './StuffBioForm'

const StuffBioEditModal = ({ isOpen, onOpenChange, itemDataOld = {}, handleUpdate}) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [itemData, setItemData] = useState(itemDataOld)

  const clear = (itemData) => {
    setLoading(false)
    setDisabled(true)
    setItemData(itemData ? itemData : itemDataOld)
  }

  const handleSubmit = async(onClose) => {
    if (itemData.text=='') return;
    setLoading(true)
    await handleUpdate(itemData)

    clear(itemData)
    onClose()
  }

  useEffect(() => {
    if (disabled) {
      if (itemData.text != '') setDisabled(false)
    } else {
      if (itemData.text == '') setDisabled(true)
    }
  }, [itemData])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar Biografía
            </ModalHeader>
            <ModalBody>
              <StuffBioForm itemData={itemData} setItemData={setItemData}/>
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

export default StuffBioEditModal;