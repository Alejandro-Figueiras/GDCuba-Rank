'use client'
import type DictionaryObject from '@/helpers/DictionaryObject'
import { Textarea } from '@heroui/react'
import { type Dispatch, type SetStateAction } from 'react'

const StuffBioForm = ({
  itemData,
  setItemData
}: {
  itemData: DictionaryObject<any>
  setItemData: Dispatch<SetStateAction<DictionaryObject<any>>>
}) => {
  const handleChange = (value: string) => {
    const data: DictionaryObject<any> = { ...itemData }
    data.text = value
    setItemData(data)
  }

  let defaultText = ''
  if (itemData.text) defaultText = itemData.text
  return (
    <>
      <Textarea
        label='Escribe tu Biografía'
        onValueChange={handleChange}
        defaultValue={defaultText}
      />
    </>
  )
}

export default StuffBioForm
