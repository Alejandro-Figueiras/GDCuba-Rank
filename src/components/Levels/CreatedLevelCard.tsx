'use client'
import { Card } from '@heroui/react'
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
    <Card className={`w-75 ${className}`}>
      <Card.Content className='flex flex-row justify-between'>
        <div className='flex flex-row justify-between gap-3'>
          <img
            alt='diff'
            height={35}
            width={35}
            className='rounded-sm'
            src={difficultyData.path}
          />
          <div className='flex flex-col justify-center'>
            <p className='text-md flex gap-2'>{level.levelname} </p>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}

export default CreatedLevelCard
