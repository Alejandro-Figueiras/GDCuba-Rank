'use client'

import StuffItemTitle from './StuffItemTitle'
import './StuffHardest.css'
import CreatedLevelCard from '@/components/Levels/CreatedLevelCard'
import { useEditStuffItem } from './useEditStuffItem'
import StuffCreatedForm from './StuffCreatedForm'
import StuffEditModal from './StuffEditModal'

const StuffCreated = ({ itemData, id, handlers, manage = false, accStuff }) => {
  const { handleEdit, handleUpdate, modalDisclosure } = useEditStuffItem({
    id,
    handlers,
    notifyTexts: {
      success: 'Niveles actualizados',
      error: 'Error al actualizar los niveles'
    }
  })

  return (
    <div className='my-2 flex flex-col'>
      {manage && (
        <StuffEditModal
          {...modalDisclosure}
          itemDataOld={itemData}
          title='Editar Niveles'
          handleUpdate={handleUpdate}
          Form={StuffCreatedForm}
          updateListener={(itemDataNew, disabled, setDisabled) => {
            if (disabled) {
              if (itemDataNew.levels.length != 0) setDisabled(false)
            } else {
              if (itemDataNew.levels.length == 0) setDisabled(true)
            }
          }}
          submitPreventer={(itemDataNew) => {
            if (itemDataNew.levels.length == 0) return false
            return true
          }}
        />
      )}
      <StuffItemTitle
        title='Niveles Creados / Participaciones'
        id={id}
        handlers={{ ...handlers, handleEdit }}
        manage={manage}
        accStuff={accStuff}
      />
      <div className='hardest-levels__sm-row mt-2 flex flex-row flex-wrap justify-between gap-2'>
        {itemData.levels.map((level, i) => (
          <CreatedLevelCard
            key={i}
            level={level}
            className='record-card__mini border-2 border-default'
            mini={true}
          />
        ))}
      </div>
    </div>
  )
}

export default StuffCreated
