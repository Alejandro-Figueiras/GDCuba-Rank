'use client'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'

const StuffItemTitle = ({
  title,
  id,
  handlers,
  manage = false,
  accStuff = ''
}) => {
  const handleMove = (down = false) => {
    let stuff = accStuff.split(',')
    const index = stuff.findIndex((val) => val == id)
    if (!down) {
      const temp = stuff[index]
      stuff[index] = stuff[index - 1]
      stuff[index - 1] = temp
    }
    {
      const temp = stuff[index]
      stuff[index] = stuff[index + 1]
      stuff[index + 1] = temp
    }
    stuff = stuff.filter((val) => val != '' && val != null)
    const newStuff = stuff.join(',')
    handlers.handleSort(newStuff)
  }

  const titleSpan = (
    <span className='text-xs font-medium text-default-500'>{title}</span>
  )

  return manage ? (
    <div className='flex flex-row justify-start'>
      <Dropdown>
        <DropdownTrigger>{titleSpan}</DropdownTrigger>
        <DropdownMenu aria-label='Dynamic Actions'>
          {handlers.handleEdit && (
            <DropdownItem
              onPress={() => {
                if (handlers.handleEdit) handlers.handleEdit()
              }}
            >
              Editar
            </DropdownItem>
          )}
          {!accStuff.startsWith(id) && (
            <DropdownItem onPress={() => handleMove(false)}>Subir</DropdownItem>
          )}
          {!accStuff.endsWith(id) && (
            <DropdownItem onPress={() => handleMove(true)}>Bajar</DropdownItem>
          )}
          <DropdownItem
            color='danger'
            className='text-danger'
            onPress={() => {
              handlers.handleDelete(id)
            }}
          >
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  ) : (
    titleSpan
  )
}

export default StuffItemTitle
