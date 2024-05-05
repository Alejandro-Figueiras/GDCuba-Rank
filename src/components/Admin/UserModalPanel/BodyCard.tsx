import { Card, CardHeader, CardBody } from '@nextui-org/react'
import { type ReactNode } from 'react'

const BodyCard = ({
  children,
  cardTitle
}: {
  children: ReactNode
  cardTitle: string
}) => {
  return (
    <Card title='Datos' className='h-full'>
      <CardHeader>
        <h2 className='w-full text-center'>{cardTitle}</h2>
      </CardHeader>
      <CardBody className='flex items-center justify-center gap-3 p-0'>
        {children}
      </CardBody>
    </Card>
  )
}

export default BodyCard
