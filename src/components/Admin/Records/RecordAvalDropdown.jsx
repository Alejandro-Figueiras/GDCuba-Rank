'use client'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import { useState } from 'react'
import { RECORDS_AVAL_VALUES } from '@/models/constants'

const RecordAvalDropdown = ({record}) => {
  const [aval, setAval] = useState(record.aval)
  
  const handleChange = (change => {

    console.log(change.currentKey)
    setAval(change.currentKey)
  })

  return (<Dropdown>
    <DropdownTrigger>
      <Button 
        variant="flat" 
        size="sm"
        color={RECORDS_AVAL_VALUES[aval].color}
      >
        {RECORDS_AVAL_VALUES[aval].value}
      </Button>
    </DropdownTrigger>
    <DropdownMenu 
      aria-label="Aval Dropdown"
      variant="bordered"
      disallowEmptySelection
      selectionMode="single"
      selectedKeys={aval}
      onSelectionChange={handleChange}
    >
      {Object.keys(RECORDS_AVAL_VALUES).map(
        key => <DropdownItem key={key}>{RECORDS_AVAL_VALUES[key].value}</DropdownItem>
      )}
    </DropdownMenu>
  </Dropdown>)
}

export default RecordAvalDropdown;