import { type ReactNode } from 'react'

export const SidebarMenu = ({
  title,
  children
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <span className='text-xs font-normal '>{title}</span>
      {children}
    </div>
  )
}
