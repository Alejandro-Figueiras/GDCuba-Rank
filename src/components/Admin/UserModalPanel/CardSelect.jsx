import {Select, SelectItem} from "@nextui-org/react"

const CardSelect = ({ items, placeholder, label, onChange, selectedKeys }) => {
  return (
    <Select
      items={items}
      label={label}
      placeholder={placeholder}
      className="max-w-xs"
      selectedKeys={selectedKeys}
      onChange={onChange}
    >
      {items.map((item, key) => (
        <SelectItem key={item.key} value={item.key}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}

export default CardSelect