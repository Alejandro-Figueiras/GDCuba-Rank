'use client'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'

const StuffItemTitle = ({title, id, handlers, manage = false}) => {
  const titleSpan = <span className="text-xs font-medium text-default-500">{title}</span>;

  return manage ? (<div className='flex flex-row justify-start'>
    <Dropdown>
      <DropdownTrigger>
        {titleSpan}
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions">
        {handlers.handleEdit && <DropdownItem onPress={() => {if (handlers.handleEdit) handlers.handleEdit()}}>
          Editar
        </DropdownItem>}
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
  </div>) : titleSpan
}

export default StuffItemTitle