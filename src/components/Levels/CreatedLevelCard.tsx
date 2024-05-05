'use client'
import { Card, CardBody, Image, Link } from '@nextui-org/react'
import { parseDifficulty } from '@/helpers/levelParser'
import type Level from '@/models/Level'

const CreatedLevelCard = ({
  level,
  className = ''
}: {
  level: Level
  className?: string
}) => {
  if (!level) return null

  const difficultyData = parseDifficulty(level)
  return (
    <Card className={`w-[300px] ${className}`}>
      <CardBody className='flex flex-row justify-between'>
        <div className='flex flex-row justify-between gap-3'>
          <Image
            alt='diff'
            height={35}
            width={35}
            radius='sm'
            src={difficultyData.path}
          />
          <div className='flex flex-col justify-center'>
            <p className='text-md flex gap-2'>{level.levelname} </p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default CreatedLevelCard
