'use client'
import { useState } from 'react'
import { Checkbox } from '@nextui-org/react'
import { changeCubanAction } from '@/actions/admin/accountsActions'
import { notify } from '@/libs/toastNotifications'

const CubanCheckbox = ({acc, updateData, openModal}) => {
  const [value, setValue] = useState(acc.cuba==1)

  const handleChange = async(value) => {
    openModal({
        title: `Cambiar nacionalidad de ${acc.username}`,
        desc: `¿Seguro que quieres ${value?'agregarle':'eliminarle'} la etiqueta cubano a ${acc.username}?`,
        action: "primary",
        onSubmit: async () => {
          const result = JSON.parse(await changeCubanAction({
            username: acc.username,
            cuba: value?'1':'0'
          }))
   
          if (result==1) {
            const success = notify(
              `Cambiado ${acc.username}: Cubano ${value?'checked':'unchecked'}`,
              "success"
            );
            setValue(value)
          } else {
            const error = notify(`Error al cambiar la nacionalidad de ${acc.username}`, "error");
          }

          updateData()
        },
      });
  }

  return (<Checkbox 
    isSelected={value}
    onValueChange={handleChange}
    size="md"
  >Cubano</Checkbox>)
}

export default CubanCheckbox