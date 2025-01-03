'use client'
import { useState } from 'react'
import { Checkbox } from '@nextui-org/react'
import { changeCubanAction } from '@/actions/admin/accountsActions'
import { notify } from '@/libs/toastNotifications'
import { type Account } from '@/models/Account'

const CubanCheckbox = ({
  acc,
  updateData,
  openModal
}: {
  acc: Account
  updateData: () => void
  openModal: (props: {
    title: string
    desc: string
    action: string
    onSubmit: () => Promise<void>
  }) => void
}) => {
  const [value, setValue] = useState(acc.cuba == 1)

  const handleChange = async (value: boolean) => {
    openModal({
      title: `Cambiar nacionalidad de ${acc.username}`,
      desc: `¿Seguro que quieres ${value ? 'agregarle' : 'eliminarle'} la etiqueta cubano a ${acc.username}?`,
      action: 'primary',
      onSubmit: async () => {
        const result = await changeCubanAction({
          username: acc.username,
          cuba: value ? 1 : 0
        })

        if (result) {
          notify(
            `Cambiado ${acc.username}: Cubano ${value ? 'checked' : 'unchecked'}`,
            'success'
          )
          setValue(value)
        } else {
          notify(`Error al cambiar la nacionalidad de ${acc.username}`, 'error')
        }

        updateData()
      }
    })
  }

  return (
    <Checkbox isSelected={value} onValueChange={handleChange} size='md'>
      Cubano
    </Checkbox>
  )
}

export default CubanCheckbox
