'use client'

import {
  useState,
  useRef,
  useEffect
} from 'react'
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Select,
  SelectItem,
  Button
} from '@nextui-org/react'
import StuffBioForm from './Stuff/StuffBioForm'

const ITEM_TYPES = {
  bio: 'Biografía'
}

const AddStuffModal = ({ isOpen, onOpenChange }) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [itemType, setItemType] = useState('none')
  const itemData = useRef({})

  const clear = () => {
    setLoading(false)
    setItemType('none')
    setDisabled(true)
    itemData.current = {}
  }

  const handleSubmit = async(onClose) => {
    const data = itemData.current
    if (itemType=='bio') {
      if (data.text=='') return;
      setLoading(true)

      clear()
      onClose()
    }
  }

  useEffect(() => {
    console.log('effect')
    const data = itemData.current
    if (disabled) {
      if (
        (itemType == 'bio' && data.text != '')
        ) setDisabled(false)
    } else {
      if (itemType == 'none' || 
        (itemType == 'bio' && data.text == '')
      ) setDisabled(true)
    }
  }, [itemType, itemData.current])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Agregar Item
            </ModalHeader>
            <ModalBody>
              <Select 
                label="Seleccione un tipo" 
                className="" 
                onChange={({target}) => {
                  setItemType((target.value == '')?'none':target.value)
                  itemData.current = {
                    type: target.value
                  }
                  if (target.value == 'bio') itemData.current.text = ''
                }}
              >
                {Object.keys(ITEM_TYPES).map((key) => (
                  <SelectItem key={key} value={key}>
                    {ITEM_TYPES[key]}
                  </SelectItem>
                ))}
              </Select>
              {itemType=='bio' && <StuffBioForm itemData={itemData}/>}
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

export default AddStuffModal;