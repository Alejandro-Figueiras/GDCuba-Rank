'use client'
import { Card, CardBody, Image, Link } from '@nextui-org/react'
import {
  getDifficultyNameByNumber,
  getDifficultyPath
} from '@/helpers/levelParser'
import YouTubeIcon from '../Icons/YouTubeIcon'

const RecordCard = ({ record, className, mini = false }) => {
  if (!record) return null
  return (
    <Card className={`w-[300px] ${className}`}>
      <CardBody className='flex flex-row justify-between'>
        <div className='flex flex-row justify-between gap-3'>
          <Image
            alt='diff'
            height={!mini ? 40 : 35}
            width={!mini ? 40 : 35}
            radius='sm'
            src={getDifficultyPath({
              featured: record.featured,
              difficultyName: getDifficultyNameByNumber(record.difficulty)
            })}
          />
          <div className='flex flex-col justify-center'>
            <p className='text-md flex gap-2'>
              {record.levelname}{' '}
              {record.video && (
                <Link href={record.video} isExternal>
                  <YouTubeIcon />
                </Link>
              )}
            </p>
            {!mini ? (
              record.aval == 1 ? (
                <p className='text-small text-default-500'>
                  {getDifficultyNameByNumber(record.difficulty)}
                </p>
              ) : record.aval == 0 ? (
                <p className='text-small text-warning-500'>Sin revisión</p>
              ) : record.aval == -2 ? (
                <p className='text-small text-warning-500'>Pendiente</p>
              ) : (
                <p className='text-small text-danger-500'>Denegado</p>
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
      </CardBody>
    </Card>
  )
}

export default RecordCard
