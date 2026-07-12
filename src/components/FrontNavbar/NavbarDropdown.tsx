import { Dropdown, Button } from '@heroui/react'
import ChevronDownIcon from '../Icons/ChevonDrownIcon'
import { usePathname } from 'next/navigation'
import FrontNavbarItem from './FrontNavbarItem'

const NavbarDropdown = ({
  info
}: {
  info: {
    title: string
    startsWith: string
    items: FrontNavbarItem[]
  }
}) => {
  const rutaActual = usePathname()
  return (
    <li>
      <Dropdown>
        <Button
          className={
            'rounded-sm bg-transparent p-0 text-lg' +
            (rutaActual.startsWith(info.startsWith) ? ' text-primary' : '')
          }
          variant='ghost'
        >
          {info.title}
          <ChevronDownIcon />
        </Button>
        <Dropdown.Popover className='bg-background/90 rounded-xl border border-gray-700'>
          <Dropdown.Menu aria-label={info.title}>
            {info.items.map((item) => (
              <Dropdown.Item
                key={item.key}
                className='hover:text-foreground rounded-xl dark:hover:bg-[#FFFFFF22]'
                href={item.href}
              >
                <img src={item.img} width='24' alt='' />
                {item.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </li>
  )
}

export default NavbarDropdown
