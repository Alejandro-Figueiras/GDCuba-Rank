'use client'

import StuffItemTitle from "./StuffItemTitle";
import './StuffHardest.css'
import CreatedLevelCard from "@/components/Levels/CreatedLevelCard";
import { useDisclosure } from '@nextui-org/react'
import { useSesion } from '@/hooks/useSesion';
import { notify } from '@/libs/toastNotifications';
import { updateStuffItemDataAction } from '@/actions/accounts/stuffActions'
import StuffCreatedEditModal from "./StuffCreatedEditModal";

const StuffCreated = ({itemData, id, handlers, manage = false, accStuff}) => {
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

      notify('Niveles actualizados', 'success')
    } else {
      notify('Error al actualizar los niveles', 'error')
    }
  }

  return <div className="flex flex-col my-2">
    {manage && <StuffCreatedEditModal isOpen={isOpen} onOpenChange={onOpenChange} itemDataOld={itemData} handleUpdate={handleUpdate}/>}
    <StuffItemTitle title='Niveles Creados / Participaciones' id={id} handlers={{...handlers, handleEdit}} manage={manage} accStuff={accStuff}/>
    <div className="flex flex-row gap-2 justify-between flex-wrap mt-2 hardest-levels__sm-row">
      {itemData.levels.map((level, i) => <CreatedLevelCard key={i} level={level} className="border-2 border-default record-card__mini" mini={true}/>)}
    </div>
  </div>
}

export default StuffCreated;