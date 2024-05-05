import { Select, SelectItem } from '@nextui-org/react'
import { ChangeEventHandler } from 'react'

const CardSelect = ({
  items,
  placeholder,
  label,
  onChange,
  selectedKeys,
  isDisabled = false
}: {
  items: {
    key: string
    label: string
  }[]
  placeholder?: string
  label: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  selectedKeys: 'all' | Iterable<string> | undefined
  isDisabled?: boolean
}) => {
  return (
    <Select
      items={items}
      label={label}
      placeholder={placeholder}
      className='max-w-xs'
      selectedKeys={selectedKeys}
      onChange={onChange}
      isDisabled={isDisabled}
    >
      {items.map((item) => (
        <SelectItem key={item.key} value={item.key}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  )
}

export default CardSelect
