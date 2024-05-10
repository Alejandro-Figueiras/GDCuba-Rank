'use client'

import { useState, useEffect, type SetStateAction, type Dispatch } from 'react'
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
import {
  submitStuffItemAction,
  updateAccountStuffAction
} from '@/actions/accounts/stuffActions'
import { useSesion } from '@/hooks/useSesion'
import StuffCreatedForm from './Stuff/StuffCreatedForm'
import { type Account } from '@/models/Account'
import type StuffItem from '@/models/StuffItem'
import type DictionaryObject from '@/helpers/DictionaryObject'
import { notify } from '@/libs/toastNotifications'

const ITEM_TYPES: DictionaryObject<string> = {
  bio: 'Biografía',
  hardest: 'Hardest Levels',
  created: 'Mis Creaciones / Participaciones'
}

const AddStuffModal = ({
  isOpen,
  onOpenChange,
  account,
  setAccount,
  stuffItems = [],
  setStuffItems
}: {
  isOpen: boolean
  onOpenChange: () => void
  account: Account
  setAccount: Dispatch<SetStateAction<Account>>
  stuffItems: StuffItem[]
  setStuffItems: Dispatch<SetStateAction<StuffItem[]>>
}) => {
  const { currentUser } = useSesion()
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [itemType, setItemType] = useState('none')
  const [itemData, setItemData] = useState({} as DictionaryObject<any>)

  const clear = () => {
    setLoading(false)
    setItemType('none')
    setDisabled(true)
    setItemData({})
  }

  const handleSubmit = async (onClose: () => void) => {
    if (itemType == 'bio' || itemType == 'hardest' || itemType == 'created') {
      if (itemType == 'bio' && itemData.text == '') return
      if (itemType == 'created' && itemData.levels.length == 0) return
      if (itemType == 'hardest') itemData.accountid = currentUser.accountid
      setLoading(true)

      if (!currentUser.accountid || !currentUser.username) return
      const item = {
        accountid: currentUser.accountid,
        username: currentUser.username,
        data: JSON.stringify(itemData)
      }
      const submitResult = await submitStuffItemAction(item)
      if (submitResult == -1 || !submitResult) {
        notify('Error al enviar el record. Inténtelo de nuevo', 'error')
        return
      }
      const { id } = submitResult
      let newOrder = account.stuff
      newOrder += `${newOrder == '' ? '' : ','}${id}`
      const updateResult = await updateAccountStuffAction({
        accountid: currentUser.accountid,
        username: currentUser.username,
        stuff: newOrder
      })

      // Updating states
      if (!id || !updateResult) return
      const newAcc = { ...account }
      newAcc.stuff = newOrder
      const newItem: StuffItem = {
        id,
        ...item
      }
      setStuffItems((items) => [...items, newItem])
      console.log(newAcc)
      console.log(newAcc)
      setAccount(newAcc)

      clear()
      onClose()
    }
  }

  useEffect(() => {
    if (disabled) {
      if (
        (itemType == 'bio' && itemData.text != '') ||
        itemType == 'hardest' ||
        (itemType == 'created' && itemData.levels.length > 0)
      )
        setDisabled(false)
    } else {
      if (
        itemType == 'none' ||
        (itemType == 'bio' && itemData.text == '') ||
        (itemType == 'created' && itemData.levels.length == 0)
      )
        setDisabled(true)
    }
  }, [itemType, itemData, disabled])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='top-center'
      size='xl'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Agregar Item
            </ModalHeader>
            <ModalBody>
              <Select
                label='Seleccione un tipo'
                className=''
                onChange={({ target }) => {
                  setItemType(target.value == '' ? 'none' : target.value)
                  const data = {
                    type: target.value
                  } as DictionaryObject<any>

                  // DEFAULT VALUES OF ITEM DATA
                  if (target.value == 'bio') data.text = ''
                  if (target.value == 'created') data.levels = []
                  // ---------------------------

                  setItemData(data)
                }}
              >
                {Object.keys(ITEM_TYPES)
                  .filter((val) => {
                    if (['bio', 'hardest', 'created'].includes(val)) {
                      for (const item of stuffItems) {
                        if (!account.stuff.split(',').includes(`${item.id}`))
                          continue
                        const { type } =
                          typeof item.data == 'string'
                            ? JSON.parse(item.data)
                            : item.data
                        if (type == val) return false
                      }
                    }
                    return true
                  })
                  .map((key) => (
                    <SelectItem key={key} value={key}>
                      {ITEM_TYPES[key]}
                    </SelectItem>
                  ))}
              </Select>
              {itemType == 'bio' && (
                <StuffBioForm itemData={itemData} setItemData={setItemData} />
              )}
              {itemType == 'created' && (
                <StuffCreatedForm
                  itemData={itemData}
                  setItemData={setItemData}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color='default'
                variant='flat'
                onPress={() => {
                  clear()
                  onClose()
                }}
              >
                Cerrar
              </Button>
              <Button
                color='primary'
                onPress={() => {
                  handleSubmit(onClose)
                }}
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

export default AddStuffModal
