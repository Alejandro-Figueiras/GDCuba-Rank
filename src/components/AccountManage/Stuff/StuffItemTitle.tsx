'use client'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import type StuffHandlers from './StuffHandlers'

const StuffItemTitle = ({
  title,
  id,
  handlers,
  manage = false,
  accStuff = ''
}: {
  title: string
  id: number
  handlers?: StuffHandlers
  manage?: boolean
  accStuff?: string
}) => {
  const handleMove = (down = false) => {
    let stuff = accStuff.split(',')
    const index = stuff.findIndex((val) => parseInt(val) == id)
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
    if (handlers?.handleSort) handlers.handleSort(newStuff)
  }

  const titleSpan = (
    <span className='text-xs font-medium text-default-500'>{title}</span>
  )

  const dynamicItems: JSX.Element[] = []
  if (handlers?.handleEdit) {
    dynamicItems.push(
      <DropdownItem
        onPress={() => {
          if (handlers.handleEdit) handlers.handleEdit()
        }}
        key={`stuff_${id}_editDropdownItem`}
      >
        Editar
      </DropdownItem>
    )
  }
  if (!accStuff.startsWith(id.toString())) {
    dynamicItems.push(
      <DropdownItem
        key={`stuff_${id}_moveUpDropdownItem`}
        onPress={() => handleMove(false)}
      >
        Subir
      </DropdownItem>
    )
  }
  if (!accStuff.endsWith(id.toString())) {
    dynamicItems.push(
      <DropdownItem
        key={`stuff_${id}_moveDownDropdownItem`}
        onPress={() => handleMove(true)}
      >
        Bajar
      </DropdownItem>
    )
  }
  dynamicItems.push(
    <DropdownItem
      color='danger'
      className='text-danger'
      onPress={() => {
        if (handlers?.handleDelete) handlers.handleDelete(id)
      }}
      key={`stuff_${id}_deleteDropdownItem`}
    >
      Eliminar
    </DropdownItem>
  )

  return manage ? (
    <div className='flex flex-row justify-start'>
      <Dropdown>
        <DropdownTrigger>{titleSpan}</DropdownTrigger>
        <DropdownMenu aria-label='Dynamic Actions'>{dynamicItems}</DropdownMenu>
      </Dropdown>
    </div>
  ) : (
    titleSpan
  )
}

export default StuffItemTitle
