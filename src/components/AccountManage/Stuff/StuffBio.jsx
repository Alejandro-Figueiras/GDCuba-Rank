'use client'

import StuffBioEditModal from "./StuffBioEditModal";
import StuffItemTitle from "./StuffItemTitle";
import { useEditStuffItem } from "./useEditStuffItem";

const StuffBio = ({itemData, id, handlers, manage = false, accStuff = ""}) => {
  const {handleEdit, handleUpdate, modalDisclosure} = useEditStuffItem({id, handlers, notifyTexts: {
    success: 'Biografía actualizada',
    error: 'Error al actualizar la biografía'
  }})

  return <div className="flex flex-col my-2">
    {manage && <StuffBioEditModal {...modalDisclosure} itemDataOld={itemData} handleUpdate={handleUpdate}/>}
    <StuffItemTitle title='Biografía' id={id} handlers={{...handlers, handleEdit}} manage={manage} accStuff={accStuff}/>
    <div>
      {itemData.text.split(`\n`).map((text, i)=><p key={`bio${i}`}>
        {text}
      </p>)}
    </div>
  </div>
}

export default StuffBio;