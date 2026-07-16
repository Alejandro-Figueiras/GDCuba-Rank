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
    <li>
      <Link
        href={href}
        className={rutaActual == href ? 'text-primary' : 'text-foreground'}
        aria-current={rutaActual == href ? 'page' : undefined}
      >
        {children}
      </Link>
    </li>
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
    <div onClick={onClick}>
      <Link
        href={href}
        className={`block w-full ${fontSize ?? 'text-2xl'} ${rutaActual == href ? 'text-primary' : 'text-foreground'}`}
        aria-current={rutaActual == href ? 'page' : undefined}
      >
        {children}
      </Link>
    </div>
  )
}
