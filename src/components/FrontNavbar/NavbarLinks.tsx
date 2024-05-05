import { NavbarItem, NavbarMenuItem } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'

export const NavLink = ({
  href,
  children
}: {
  href: string
  children: ReactNode
}) => {
  const rutaActual = usePathname()

  return (
    <NavbarItem isActive={rutaActual == href}>
      <Link href={href} color={rutaActual == href ? 'primary' : 'foreground'}>
        {children}
      </Link>
    </NavbarItem>
  )
}

export const NavMenuLink = ({
  href,
  children,
  fontSize,
  onClick = () => {}
}: {
  href: string
  fontSize?: string
  children: ReactNode
  onClick?: () => void
}) => {
  const rutaActual = usePathname()

  return (
    <NavbarMenuItem isActive={rutaActual == href} onClick={onClick}>
      <Link
        href={href}
        color='primary'
        className={`w-full ${fontSize ?? 'text-2xl'}`}
      >
        {children}
      </Link>
    </NavbarMenuItem>
  )
}
