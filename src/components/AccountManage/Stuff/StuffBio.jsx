'use client'

import { useDisclosure } from '@nextui-org/react'
import StuffBioEditModal from "./StuffBioEditModal";
import StuffItemTitle from "./StuffItemTitle";
import { updateStuffItemDataAction } from '@/actions/accounts/stuffActions'
import { useSesion } from '@/hooks/useSesion';
import { notify } from '@/libs/toastNotifications';

const StuffBio = ({itemData, id, handlers, manage = false}) => {
  // TODO subir
  // TODO bajar
  const { currentUser } = useSesion();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const handleEdit = () => {
    onOpen();
  }

  const handleUpdate = async(itemData = '') => {
    const item = {
      accountid: currentUser.accountid,
      username: currentUser.username,
      data: JSON.stringify(itemData),
      id
    }
    
    const result = await updateStuffItemDataAction(item)
    console.log(result)
    if (result) {
      item.id = id;
      handlers.setStuffItems(items => {
        const newItems = [];
        for (const item of items) {
          if (item.id == id)
            item.data = JSON.stringify(itemData)
          newItems.push(item)
        }
        return newItems
      })

      notify('Biografía actualizada', 'success')
    } else {
      notify('Error al actualizar la biografía', 'error')
    }
  }

  return <div className="flex flex-col my-2">
    {manage && <StuffBioEditModal isOpen={isOpen} onOpenChange={onOpenChange} itemDataOld={itemData} handleUpdate={handleUpdate}/>}
    <StuffItemTitle title='Biografía' id={id} handlers={{...handlers, handleEdit}} manage={manage}/>
    <div>
      {itemData.text.split(`\n`).map((text, i)=><p key={`bio${i}`}>
        {text}
      </p>)}
    </div>
  </div>
}

export default StuffBio;