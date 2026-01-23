'use client'

import { getHardestLevelsAction } from '@/actions/accounts/getHardestLevelsAction'
import StuffItemTitle from './StuffItemTitle'
import { useEffect, useState } from 'react'
import RecordCard from '@/components/Records/RecordCard'
import { Spinner } from '@heroui/react'
import type DictionaryObject from '@/helpers/DictionaryObject'
import type StuffHandlers from './StuffHandlers'

const StuffHardest = ({
  itemData,
  id,
  handlers,
  manage = false,
  accStuff
}: {
  itemData: DictionaryObject<any>
  id: number
  handlers?: StuffHandlers
  manage?: boolean
  accStuff: string
}) => {
  const [levels, setLevels] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingError, setLoadingError] = useState('')

  useEffect(() => {
    setLoading(true)
    getHardestLevelsAction(itemData.accountid)
      .then((response) => {
        setLevels(JSON.parse(response))
      })
      .catch((err) => {
        console.log(err)
        setLoadingError('Error al cargar los hardest')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [itemData.accountid])

  return (
    <div className='my-2 flex flex-col'>
      <StuffItemTitle
        title='Hardest Levels'
        id={id}
        handlers={{ ...handlers }}
        manage={manage}
        accStuff={accStuff}
      />
      <div className='mt-2 flex flex-row flex-wrap justify-between gap-2 max-[720px]:justify-center'>
        {levels.map((level, i) => (
          <RecordCard
            key={i}
            record={level}
            className='border-default mini={true} border-2 max-[720px]:w-100'
          />
        ))}
      </div>
      {loadingError != '' && (
        <div className='mt-2 flex flex-col items-center'>
          <img src='/assets/ui/delete.png' className='w-8' alt='delete' />
          <p className='text-medium'>{loadingError}</p>
        </div>
      )}
      {loading && (
        <div className='mt-2 flex flex-col items-center'>
          <Spinner />
          <p className='text-medium'>Cargando...</p>
        </div>
      )}
    </div>
  )
}

export default StuffHardest
