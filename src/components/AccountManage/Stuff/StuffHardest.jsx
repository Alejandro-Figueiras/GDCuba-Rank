'use client'

import { getHardestLevelsAction } from '@/actions/accounts/getHardestLevelsAction'
import StuffItemTitle from './StuffItemTitle'
import { useEffect, useState } from 'react'
import RecordCard from '@/components/Records/RecordCard'
import { Spinner } from '@nextui-org/react'
import './StuffHardest.css'

const StuffHardest = ({ itemData, id, handlers, manage = false, accStuff }) => {
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
      <div className='hardest-levels__sm-row mt-2 flex flex-row flex-wrap justify-between gap-2'>
        {levels.map((level, i) => (
          <RecordCard
            key={i}
            record={level}
            className='record-card__mini border-2 border-default'
            mini={true}
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
