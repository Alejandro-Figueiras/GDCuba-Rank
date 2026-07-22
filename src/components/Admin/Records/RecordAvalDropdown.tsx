'use client'
import { Dropdown, Button, Label } from '@heroui/react'
import { type Key, useState } from 'react'
import { RECORDS_AVAL_VALUES } from '@/models/constants'
import { changeAval } from '@/actions/admin/changeRecord'
import { type Record } from '@/models/Record'

export type Aval = 1 | 0 | -1 | -2

const RecordAvalDropdown = ({ record }: { record: Record }) => {
  const [aval, setAval] = useState(record.aval)

  const handleChange = async (keys: Set<Key>) => {
    keys.forEach(async (key) => {
      const resultCode = await changeAval({
        id: record.id,
        aval: key as Aval
      })
      if (resultCode == 1) {
        setAval(key as Aval)
      }
    })
  }

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button
          variant='tertiary'
          size='sm'
          // color={
          //   RECORDS_AVAL_VALUES[aval as 1 | 0 | -1 | -2].color as
          //     | 'success'
          //     | 'warning'
          //     | 'danger'
          //     | undefined
          // }
        >
          {RECORDS_AVAL_VALUES[aval as Aval].value}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu
          // aria-label='Aval Dropdown'
          // variant='bordered'
          disallowEmptySelection
          selectionMode='single'
          onSelectionChange={(keys) => handleChange(keys as Set<Key>)}
        >
          {Object.keys(RECORDS_AVAL_VALUES).map((key) => (
            <Dropdown.Item key={key}>
              <Label>
                {RECORDS_AVAL_VALUES[key as '1' | '0' | '-1' | '-2'].value}
              </Label>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

export default RecordAvalDropdown
