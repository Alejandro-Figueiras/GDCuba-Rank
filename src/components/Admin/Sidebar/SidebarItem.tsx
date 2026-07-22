import Link from 'next/link'
import { useSidebarContext } from '@/app/admin/layout-context'
import { ReactNode } from 'react'

export const SidebarItem = ({
  icon,
  title,
  isActive,
  href = ''
}: {
  icon: ReactNode
  title: string
  isActive: boolean
  href?: string
}) => {
  const { setCollapsed } = useSidebarContext()

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed()
    }
  }

  const clases =
    (isActive
      ? 'bg-accent/40 [&_svg_path]:fill-accent'
      : 'hover:bg-default-100') +
    ' ' +
    'flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]'

  return (
    <Link href={href} className='text-default-900 max-w-full active:bg-none'>
      <div className={clases} onClick={handleClick}>
        {icon}
        <span className='text-default-900'>{title}</span>
      </div>
    </Link>
  )
}
