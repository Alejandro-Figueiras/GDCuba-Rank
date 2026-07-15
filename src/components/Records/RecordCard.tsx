'use client'
import { Card, Link } from '@heroui/react'
import {
  getDifficultyNameByNumber,
  getDifficultyPath
} from '@/helpers/levelParser'
import YouTubeIcon from '../Icons/YouTubeIcon'
import { RecordLevel, type Record } from '@/models/Record'

const RecordCard = ({
  record,
  className = '',
  mini = false
}: {
  record:
    Record | (RecordLevel & { aval: number; video?: string; percent?: number })
  className?: string
  mini?: boolean
}) => {
  if (!record) return null
  return (
    <Card className={`w-75 p-3 ${className} border-white/10`}>
      <Card.Content className='flex flex-row justify-between'>
        <div className='flex flex-row justify-between gap-3'>
          <img
            alt='diff'
            className={`aspect-square rounded-sm ${!mini ? 'max-h-12 max-w-12' : 'max-h-10 max-w-10'}`}
            src={getDifficultyPath({
              featured: record.featured,
              difficultyName: getDifficultyNameByNumber(record.difficulty)
            })}
          />
          <div className='flex flex-col justify-center'>
            <p className='text-md flex gap-2'>
              {record.levelname}{' '}
              {record.video && (
                <Link href={record.video}>
                  <YouTubeIcon />
                </Link>
              )}
            </p>
            {!mini ? (
              record.aval == 1 ? (
                <p className='text-small text-muted text-start'>
                  {getDifficultyNameByNumber(record.difficulty)}
                </p>
              ) : record.aval == 0 ? (
                <p className='text-small text-warning text-start'>
                  Sin revisión
                </p>
              ) : record.aval == -2 ? (
                <p className='text-small text-warning text-start'>Pendiente</p>
              ) : (
                <p className='text-small text-danger text-start'>Denegado</p>
              )
            ) : null}
          </div>
        </div>
        {record.percent && (
          <div className='flex flex-col justify-center'>
            {record.percent == 100 ? (
              <img
                src='/assets/ui/success.png'
                width={!mini ? 30 : 24}
                alt=''
              />
            ) : (
              `${record.percent}%`
            )}
          </div>
        )}
      </Card.Content>
    </Card>
  )
}

export default RecordCard
