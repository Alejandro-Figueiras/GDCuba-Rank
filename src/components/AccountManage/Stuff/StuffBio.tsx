'use client'

import type DictionaryObject from '@/helpers/DictionaryObject'
import StuffBioForm from './StuffBioForm'
import StuffEditModal from './StuffEditModal'
import StuffItemTitle from './StuffItemTitle'
import { useEditStuffItem } from './useEditStuffItem'
import StuffHandlers from './StuffHandlers'

const StuffBio = ({
  itemData,
  id,
  handlers,
  manage = false,
  accStuff = ''
}: {
  itemData: DictionaryObject<any>
  id: number
  handlers?: StuffHandlers
  manage?: boolean
  accStuff: string
}) => {
  const { handleEdit, handleUpdate, modalDisclosure } = useEditStuffItem({
    id,
    handlers,
    notifyTexts: {
      success: 'Biografía actualizada',
      error: 'Error al actualizar la biografía'
    }
  })

  return (
    <div className='my-2 flex flex-col'>
      {manage && (
        <StuffEditModal
          {...modalDisclosure}
          itemDataOld={itemData}
          title='Editar Biografía'
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
            if (itemDataNew.text == '') return false
            return true
          }}
        />
      )}

      <StuffItemTitle
        title='Biografía'
        id={id}
        handlers={{ ...handlers, handleEdit }}
        manage={manage}
        accStuff={accStuff}
      />
      <div>
        {(itemData.text as string).split(`\n`).map((text, i) => (
          <p key={`bio${i}`}>{text}</p>
        ))}
      </div>
    </div>
  )
}

export default StuffBio
