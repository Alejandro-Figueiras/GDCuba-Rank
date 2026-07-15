'use client'
import type DictionaryObject from '@/helpers/DictionaryObject'
import { TextField, TextArea, Label } from '@heroui/react'
import { useState, type Dispatch, type SetStateAction } from 'react'

const StuffBioForm = ({
  itemData,
  setItemData
}: {
  itemData: DictionaryObject<any>
  setItemData: Dispatch<SetStateAction<DictionaryObject<any>>>
}) => {
  const [text, setText] = useState(itemData.text ?? '')
  const handleChange = (value: string) => {
    const data: DictionaryObject<any> = { ...itemData }
    data.text = value
    setText(value)
    setItemData(data)
  }

  return (
    <TextField
      isRequired
      name='bio'
      value={text}
      onChange={handleChange}
      className='pt-2'
      variant='secondary'
    >
      <Label>Bio</Label>
      <TextArea placeholder='Escribe algo sobre ti...' />
    </TextField>
  )
}

export default StuffBioForm
