'use client'
import { Dropdown, Label } from '@heroui/react'
import type StuffHandlers from './StuffHandlers'
import { ReactNode } from 'react'

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
    <span className='text-default-500 text-xs font-medium'>{title}</span>
  )

  const dynamicItems: ReactNode[] = []
  if (handlers?.handleEdit) {
    dynamicItems.push(
      <Dropdown.Item
        onPress={() => {
          if (handlers.handleEdit) handlers.handleEdit()
        }}
        key={`stuff_${id}_editDropdownItem`}
      >
        <Label>Editar</Label>
      </Dropdown.Item>
    )
  }
  if (!accStuff.startsWith(id.toString())) {
    dynamicItems.push(
      <Dropdown.Item
        key={`stuff_${id}_moveUpDropdownItem`}
        onPress={() => handleMove(false)}
      >
        <Label>Subir</Label>
      </Dropdown.Item>
    )
  }
  if (!accStuff.endsWith(id.toString())) {
    dynamicItems.push(
      <Dropdown.Item
        key={`stuff_${id}_moveDownDropdownItem`}
        onPress={() => handleMove(true)}
      >
        <Label>Bajar</Label>
      </Dropdown.Item>
    )
  }
  dynamicItems.push(
    <Dropdown.Item
      variant='danger'
      className='text-danger'
      onPress={() => {
        if (handlers?.handleDelete) handlers.handleDelete(id)
      }}
      key={`stuff_${id}_deleteDropdownItem`}
    >
      <Label>Eliminar</Label>
    </Dropdown.Item>
  )

  return manage ? (
    <div className='flex flex-row justify-start'>
      <Dropdown>
        <Dropdown.Trigger>{titleSpan}</Dropdown.Trigger>
        <Dropdown.Popover aria-label='Dynamic Actions'>
          <Dropdown.Menu>{dynamicItems}</Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  ) : (
    titleSpan
  )
}

export default StuffItemTitle
