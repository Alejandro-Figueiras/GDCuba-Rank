'use client'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'

const StuffItemTitle = ({title, id, handlers}) => {
  return (<div className='flex flex-row justify-start'>
    <Dropdown>
      <DropdownTrigger>
        <span className="text-xs font-medium text-default-500">{title}</span>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions">
        <DropdownItem>
          Subir (TODO)
        </DropdownItem>
        <DropdownItem>
          Bajar (TODO)
        </DropdownItem>
        <DropdownItem
          color="danger"
          className="text-danger"
          onPress={() => {handlers.handleDelete(id)}}
        >
          Eliminar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>)
}

export default StuffItemTitle