'use client'

import StuffBioForm from "./StuffBioForm";
import StuffEditModal from "./StuffEditModal";
import StuffItemTitle from "./StuffItemTitle";
import { useEditStuffItem } from "./useEditStuffItem";

const StuffBio = ({itemData, id, handlers, manage = false, accStuff = ""}) => {
  const {handleEdit, handleUpdate, modalDisclosure} = useEditStuffItem({id, handlers, notifyTexts: {
    success: 'Biografía actualizada',
    error: 'Error al actualizar la biografía'
  }})

  return <div className="flex flex-col my-2">
    {manage && <StuffEditModal 
      {...modalDisclosure} 
      itemDataOld={itemData}
      title="Editar Biografía"
      handleUpdate={handleUpdate}
      Form={StuffBioForm}
      updateListener={(itemDataNew, disabled, setDisabled) => {
        if (disabled) {
          if (itemDataNew.text != '') setDisabled(false)
        } else {
          if (itemDataNew.text == '') setDisabled(true)
        }
      }}
      submitPreventer={(itemDataNew) => {
        if (itemDataNew.text == '') return false;
        return true;
      }}
    />}

    <StuffItemTitle title='Biografía' id={id} handlers={{...handlers, handleEdit}} manage={manage} accStuff={accStuff}/>
    <div>
      {itemData.text.split(`\n`).map((text, i)=><p key={`bio${i}`}>
        {text}
      </p>)}
    </div>
  </div>
}

export default StuffBio;