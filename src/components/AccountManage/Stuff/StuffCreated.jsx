'use client'

import StuffItemTitle from "./StuffItemTitle";
import './StuffHardest.css'
import CreatedLevelCard from "@/components/Levels/CreatedLevelCard";
import StuffCreatedEditModal from "./StuffCreatedEditModal";
import { useEditStuffItem } from "./useEditStuffItem";

const StuffCreated = ({itemData, id, handlers, manage = false, accStuff}) => {
  const {handleEdit, handleUpdate, modalDisclosure} = useEditStuffItem({id, handlers, notifyTexts: {
    success: 'Niveles actualizados',
    error: 'Error al actualizar los niveles'
  }})

  return <div className="flex flex-col my-2">
    {manage && <StuffCreatedEditModal {...modalDisclosure} itemDataOld={itemData} handleUpdate={handleUpdate}/>}
    <StuffItemTitle title='Niveles Creados / Participaciones' id={id} handlers={{...handlers, handleEdit}} manage={manage} accStuff={accStuff}/>
    <div className="flex flex-row gap-2 justify-between flex-wrap mt-2 hardest-levels__sm-row">
      {itemData.levels.map((level, i) => <CreatedLevelCard key={i} level={level} className="border-2 border-default record-card__mini" mini={true}/>)}
    </div>
  </div>
}

export default StuffCreated;