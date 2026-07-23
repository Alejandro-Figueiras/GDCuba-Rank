'use client'

import { useState, useEffect, type SetStateAction, type Dispatch } from 'react'
import { Modal, Select, Button, Label, ListBox, Spinner } from '@heroui/react'
import StuffBioForm from './Stuff/StuffBioForm'
// import StuffCreatedForm from './Stuff/StuffCreatedForm'
import {
  submitStuffItemAction,
  updateAccountStuffAction
} from '@/actions/accounts/stuffActions'
import { useSesion } from '@/hooks/useSesion'
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
  setOpen,
  account,
  setAccount,
  stuffItems = [],
  setStuffItems
}: {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  account: Account
  setAccount: Dispatch<SetStateAction<Account | undefined>>
  stuffItems: StuffItem[]
  setStuffItems: Dispatch<SetStateAction<StuffItem[] | undefined>>
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

  const handleSubmit = async () => {
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
      setStuffItems((items) => [...(items ?? []), newItem])
      console.log(newAcc)
      console.log(newAcc)
      setAccount(newAcc)

      clear()
      setOpen(false)
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
      onOpenChange={setOpen}
      // size='lg'
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header className='flex flex-col gap-1'>
              <Modal.Heading>Agregar Item</Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              <Select
                placeholder='-'
                variant='secondary'
                value={itemType}
                onChange={(value) => {
                  setItemType(
                    !value || value == ''
                      ? 'none'
                      : (value as 'bio' | 'created')
                  )
                  const data = {
                    type: value
                  } as DictionaryObject<any>

                  // DEFAULT VALUES OF ITEM DATA
                  if (value == 'bio') data.text = ''
                  if (value == 'created') data.levels = []
                  // ---------------------------

                  setItemData(data)
                }}
              >
                <Label>Seleccione un tipo</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className='bg-surface-secondary'>
                  <ListBox>
                    {Object.keys(ITEM_TYPES)
                      .filter((val) => {
                        if (['bio', 'hardest', 'created'].includes(val)) {
                          for (const item of stuffItems) {
                            if (
                              !account.stuff.split(',').includes(`${item.id}`)
                            )
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
                        <ListBox.Item key={key} id={key}>
                          <Label>{ITEM_TYPES[key]}</Label>
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                  </ListBox>
                </Select.Popover>
              </Select>
              {itemType == 'bio' && (
                <StuffBioForm itemData={itemData} setItemData={setItemData} />
              )}
              {/* {itemType == 'created' && (
                <StuffCreatedForm
                  itemData={itemData}
                  setItemData={setItemData}
                />
              )} */}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='ghost'
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

export default AddStuffModal
