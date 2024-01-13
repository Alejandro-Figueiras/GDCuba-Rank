'use client'
import { useState } from 'react'
import { Checkbox } from '@nextui-org/react'

const CubanCheckbox = ({acc, updateData}) => {
  const [value, setValue] = useState(acc.cuba==1)

  return (<Checkbox 
    isSelected={value}
    onValueChange={setValue}
    size="md"
  >Cubano</Checkbox>)
}

export default CubanCheckbox