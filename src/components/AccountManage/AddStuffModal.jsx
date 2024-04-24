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
  Select,
  SelectItem,
  Button
} from '@nextui-org/react'
import StuffBioForm from './Stuff/StuffBioForm'
import { submitStuffItemAction, updateAccountStuffAction } from '@/actions/accounts/stuffActions'
import { useSesion } from '@/hooks/useSesion'
import StuffCreatedForm from './Stuff/StuffCreatedForm'

const ITEM_TYPES = {
  bio: 'Biografía',
  hardest: 'Hardest Levels',
  created: 'Mis Creaciones / Participaciones'
}

const AddStuffModal = ({ isOpen, onOpenChange, account, setAccount, stuffItems = [], setStuffItems }) => {
  const { currentUser } = useSesion();
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [itemType, setItemType] = useState('none')
  const [itemData, setItemData] = useState({})

  const clear = () => {
    setLoading(false)
    setItemType('none')
    setDisabled(true)
    setItemData({})
  }

  const handleSubmit = async(onClose) => {
    if (itemType=='bio' || itemType == 'hardest' || itemType == 'created') {
      if (itemType == 'bio' && itemData.text=='') return;
      if (itemType == 'created' && itemData.levels.length == 0) return;
      if (itemType == 'hardest') itemData.accountid = currentUser.accountid;
      setLoading(true)
      const item = {
        accountid: currentUser.accountid,
        username: currentUser.username,
        data: itemData
      }
      const {id} = await submitStuffItemAction(item)
      
      let newOrder = account.stuff
      newOrder+=`${newOrder==''?'':','}${id}` 
      const updateResult = await updateAccountStuffAction({
        accountid: currentUser.accountid,
        username: currentUser.username,
        stuff: newOrder
      })
      
      // Updating states
      if (!id || !updateResult) return;
      const newAcc = {...account}
      newAcc.stuff = newOrder
      item.id = id;
      setStuffItems(items => [...items, item])
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
        (itemType == 'hardest') ||
        (itemType == 'created' && itemData.levels.length > 0)
        ) setDisabled(false)
    } else {
      if (itemType == 'none' || 
        (itemType == 'bio' && itemData.text == '') ||
        (itemType == 'created' && itemData.levels.length == 0)
      ) setDisabled(true)
    }
  }, [itemType, itemData, disabled])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size='xl'>
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
                  const data = {
                    type: target.value
                  }

                  // DEFAULT VALUES OF ITEM DATA
                  if (target.value == 'bio') data.text = ''
                  if (target.value == 'created') data.levels = []
                  // ---------------------------

                  setItemData(data)
                }}
              >
                {Object.keys(ITEM_TYPES).filter(val => {
                  if (['bio', 'hardest', 'created'].includes(val)) {
                    for (const item of stuffItems) {
                      if (!account.stuff.split(',').includes(`${item.id}`)) continue;
                      const { type } = (typeof item.data == String) ? JSON.parse(item.data) : item.data;
                      if (type == val) return false;
                    }
                  }
                  return true
                }).map((key) => (
                  <SelectItem key={key} value={key}>
                    {ITEM_TYPES[key]}
                  </SelectItem>
                ))}
              </Select>
              {itemType=='bio' && <StuffBioForm itemData={itemData} setItemData={setItemData}/>}
              {itemType=='created' && <StuffCreatedForm itemData={itemData} setItemData={setItemData}/>}
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