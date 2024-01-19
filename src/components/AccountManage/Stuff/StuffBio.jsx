'use client'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'

const StuffBio = ({itemData, id, handlers}) => {
  // TODO delete
  // TODO subir
  // TODO bajar
  return <div className="flex flex-col my-2">
    <div className="flex flex-row justify-between">
      <Dropdown>
        <DropdownTrigger>
          <span className="text-xs font-medium text-default-500">Biografía</span>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions">
          <DropdownItem>
            Subir
          </DropdownItem>
          <DropdownItem>
            Bajar
          </DropdownItem>
          <DropdownItem
            color="danger"
            className="text-danger"
          >
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
    </div>
    <p>
      {itemData.text.split(`\n`).map(text=><>
      {text}<br/>
      </>)}
    </p>
  </div>
}

export default StuffBio;