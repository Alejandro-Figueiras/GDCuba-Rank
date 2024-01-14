'use client'
import {
  Textarea
} from '@nextui-org/react'

const StuffBioForm = ({itemData}) => {
  const handleChange = (value) => {
    itemData.current.text=value
  }
  return <>
    <Textarea
      label="Escribe tu Biografía"
      onValueChange={handleChange}
    />
  </>
}

export default StuffBioForm;