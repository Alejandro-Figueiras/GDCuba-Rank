'use client'
import {
  Textarea
} from '@nextui-org/react'

const StuffBioForm = ({itemData, setItemData}) => {
  const handleChange = (value) => {
    const data = {...itemData}
    data.text = value;
    setItemData(data)
  }
  return <>
    <Textarea
      label="Escribe tu Biografía"
      onValueChange={handleChange}
    />
  </>
}

export default StuffBioForm;