import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
  NavbarItem,
} from '@nextui-org/react'
import ChevronDownIcon from '../Icons/ChevonDrownIcon';
import { usePathname } from 'next/navigation';

const NavbarDropdown = ({info}) => {
  const rutaActual = usePathname();
  return (
  <Dropdown
   classNames={{
    content: "bg-background/90 border border-default-200"
   }}
  >
    <NavbarItem>
      <DropdownTrigger>
        <Button
          disableRipple
          className={"p-0 text-lg bg-transparent data-[hover=true]:bg-transparent"+(rutaActual.startsWith(info.startsWith)?' text-primary':'')}
          endContent={<ChevronDownIcon />}
          radius="sm"
          variant="light"
        >
          {info.title}
        </Button>
      </DropdownTrigger>
    </NavbarItem>
    <DropdownMenu
      aria-label={info.title}
      itemClasses={{
        base: [
          "gap-4",
          "rounded-md",
          "transition-opacity",
          "data-[hover=true]:text-foreground",
          "data-[hover=true]:bg-[#FFFFFF22]",
          "dark:data-[hover=true]:bg-[#FFFFFF33]",
          "data-[selectable=true]:focus:bg-[#FFFFFF33]",
          "data-[pressed=true]:opacity-70",
          "data-[focus-visible=true]:ring-default-500",
        ]
      }}
    >
      {info.items.map(item => (
        <DropdownItem
          key={item.key}
          startContent={<img src={item.img} width="24" alt="" />}
          href={item.href}
        >
          {item.label}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </Dropdown>
  )
}

export default NavbarDropdown;