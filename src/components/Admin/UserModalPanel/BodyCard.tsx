import { Card } from '@heroui/react'
import { type ReactNode } from 'react'

const BodyCard = ({
  children,
  cardTitle,
  className
}: {
  children: ReactNode
  cardTitle: string
  className?: string
}) => {
  return (
    <Card title='Datos' variant='secondary' className={className}>
      <Card.Content className='flex gap-3 p-0'>
        <h2 className='text-center text-lg'>{cardTitle}</h2>
        {children}
      </Card.Content>
    </Card>
  )
}

export default BodyCard
