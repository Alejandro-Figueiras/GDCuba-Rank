'use client'

import {
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction
} from 'react'
import { Modal, Button, Spinner } from '@heroui/react'
import type DictionaryObject from '@/helpers/DictionaryObject'

const StuffEditModal = ({
  isOpen,
  setOpen,
  title,
  itemDataOld = {},
  Form,
  handleUpdate,
  updateListener = () => {},
  submitPreventer = () => true
}: {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  title: string
  itemDataOld: DictionaryObject<any>
  Form: (props: {
    itemData: DictionaryObject<any>
    setItemData: Dispatch<SetStateAction<DictionaryObject<any>>>
  }) => ReactNode
  handleUpdate: (itemData: DictionaryObject<any>) => Promise<void>
  updateListener: (
    itemData: DictionaryObject<any>,
    disabled: boolean,
    setDisabled: Dispatch<SetStateAction<boolean>>
  ) => void
  submitPreventer: (itemData: DictionaryObject<any>) => boolean
}) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [itemData, setItemData] = useState(itemDataOld)

  const clear = (itemData?: DictionaryObject<any>) => {
    setLoading(false)
    setDisabled(true)
    setItemData(itemData ? itemData : itemDataOld)
  }

  const handleSubmit = async () => {
    if (!submitPreventer(itemData)) return
    setLoading(true)
    await handleUpdate(itemData)

    clear(itemData)
    setOpen(false)
  }

  useEffect(
    () => updateListener(itemData, disabled, setDisabled),
    [itemData, disabled, updateListener]
  )

  return (
    <Modal isOpen={isOpen} onOpenChange={setOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading className='flex flex-col gap-1'>
                {title}
              </Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              <Form itemData={itemData} setItemData={setItemData} />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='tertiary'
                onPress={() => {
                  clear()
                  setOpen(false)
                }}
              >
                Cerrar
              </Button>
              <Button
                onPress={() => {
                  handleSubmit()
                }}
                isPending={loading}
                isDisabled={disabled}
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

export default StuffEditModal
