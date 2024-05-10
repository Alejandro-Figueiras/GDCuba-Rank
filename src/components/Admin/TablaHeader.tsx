'use client'
import { Button } from '@nextui-org/react'
import { type ReactNode } from 'react'

const TablaHeader = ({
  title,
  buttons = [],
  children
}: {
  title: string
  buttons?: { handleClick: () => void; text: string }[]
  children?: ReactNode
}) => {
  return (
    <div className='px-8 py-4'>
      <div className='flex flex-col items-center pb-4 sm:flex-row sm:justify-between'>
        <h2 className='pb-2 text-center text-2xl sm:text-start'>{title}</h2>
        <div className='flex gap-2'>
          {buttons.map((button, i) => (
            <Button onClick={button.handleClick} key={i}>
              {button.text}
            </Button>
          ))}
        </div>
      </div>
      {children}
    </div>
  )
}

export default TablaHeader
