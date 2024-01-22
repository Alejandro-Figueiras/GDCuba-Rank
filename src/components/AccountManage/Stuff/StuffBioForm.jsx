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

  let defaultText = '';
  if (itemData.text) defaultText = itemData.text;
  return <>
    <Textarea
      label="Escribe tu Biografía"
      onValueChange={handleChange}
      defaultValue={defaultText}
    />
  </>
}

export default StuffBioForm;