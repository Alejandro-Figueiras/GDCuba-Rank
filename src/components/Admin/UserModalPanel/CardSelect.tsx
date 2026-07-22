import { Key, Label, ListBox, Select } from '@heroui/react'
import React from 'react'

const CardSelect = ({
  items,
  placeholder,
  label,
  value,
  setValue,
  isDisabled = false
}: {
  items: {
    key: string
    label: string
  }[]
  placeholder?: string
  label: string
  setValue: React.Dispatch<Key | null>
  value: Key | null
  isDisabled?: boolean
}) => {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={(value) => setValue(value)}
      isDisabled={isDisabled}
    >
      <Label>{label}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className='max-w-xs'>
        <ListBox>
          {items.map((item) => (
            <ListBox.Item key={item.key} id={item.key} textValue={item.label}>
              {item.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}

export default CardSelect
