import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
  NavbarItem,
  Link
} from '@nextui-org/react'
import { ChevronDownIcon } from '../Icons/ChevonDrownIcon';
import { usePathname } from 'next/navigation';

const RankDropdown = () => {
  const rutaActual = usePathname();
  return (
  <Dropdown>
    <NavbarItem>
      <DropdownTrigger>
        <Button
          disableRipple
          className={"p-0 text-lg bg-transparent data-[hover=true]:bg-transparent"+(rutaActual.startsWith('/rank')?' text-primary':'')}
          endContent={<ChevronDownIcon />}
          radius="sm"
          variant="light"
        >
          Rankings
        </Button>
      </DropdownTrigger>
    </NavbarItem>
    <DropdownMenu
      aria-label="Rankings"
      itemClasses={{
        base: "gap-4",
      }}
    >
      <DropdownItem
        key="estrellas"
        startContent={<img src='/assets/stats/starsIcon.png' width="24"/>}
        href="/rank/stars"
      >
        Estrellas
      </DropdownItem>
      <DropdownItem
        key="demons"
        startContent={<img src='/assets/dificultades/harddemon_icon.png' width="24"/>}
        href="/rank/demons"
      >
        Demons
      </DropdownItem>
      <DropdownItem
        key="lunas"
        startContent={<img src='/assets/stats/moonsIcon.png' width="24"/>}
        href="/rank/moons"
      >
        Lunas
      </DropdownItem>
      <DropdownItem
        key="usercoins"
        startContent={<img src='/assets/stats/usercoin.png' width="24"/>}
        href="/rank/usercoins"
      >
        User Coins
      </DropdownItem>
      <DropdownItem
        key="cps"
        startContent={<img src='/assets/stats/creatorpoints.png' width="24"/>}
        href="/rank/cp"
      >
        Creator Points
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
  )
}

export default RankDropdown;