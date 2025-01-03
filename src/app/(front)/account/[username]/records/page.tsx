'use client'
import { getAllRecordsUserViewAction } from '@/actions/record/getAllRecordsUser'
import RecordCard from '@/components/Records/RecordCard'
import { useGDIcon } from '@/robtop/iconkit/useGDIcon'
import { useState, useEffect } from 'react'
import { Image } from '@nextui-org/react'
import { type Record } from '@/models/Record'

const sortAvalsPredicate = (a: Record, b: Record) => {
  if (a.aval == -2 && b.aval != -2) return -1
  if (b.aval == -2 && a.aval != -2) return 1
  if (a.aval == 0 && b.aval != 0) return -1
  if (b.aval == 0 && a.aval != 0) return 1
  if (a.aval == -1 && b.aval != -1) return 1
  if (b.aval == -1 && a.aval != -1) return -1
  return 0
}

const DifficultySection = ({
  title,
  records
}: {
  title: string
  records: Record[]
}) => {
  return (
    <div className='mx-auto max-w-[1200px] text-center'>
      <h2 className='mt-4 text-xl'>{title}</h2>
      <div className='flex flex-row flex-wrap justify-center'>
        {records.map((record, i) => (
          <RecordCard record={record} key={i} className='m-2' />
        ))}
      </div>
    </div>
  )
}

const AccountRecordsPage = ({
  params
}: {
  params: Promise<{ username: string }>
}) => {
  const [records, setRecords] = useState([] as Record[])
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string | undefined>(undefined)
  const { icon: iconAvatar } = useGDIcon({
    type: 'cube',
    username: username
  })

  useEffect(() => {
    params.then((params) => setUsername(params.username))
  }, [params])
  useEffect(() => {
    setLoading(true)
    if (username)
      getAllRecordsUserViewAction(username).then((recordsStr) => {
        setLoading(false)
        const records = JSON.parse(recordsStr) as Record[]
        console.log(records)
        setRecords(records)
      })
  }, [username])

  const extremes = records
    .filter((val) => val.difficulty == 15)
    .sort((a, b) => b.difficultyscore - a.difficultyscore)
    .sort(sortAvalsPredicate)

  const insanes = records
    .filter((val) => val.difficulty == 14)
    .sort((a, b) => b.id - a.id)
    .sort(sortAvalsPredicate)

  const demons = records
    .filter((val) => val.difficulty < 14 && val.difficulty > 10)
    .sort((a, b) => {
      const diff = b.difficulty - a.difficulty
      if (diff != 0) return diff
      return b.id - a.id
    })
    .sort(sortAvalsPredicate)

  const noDemons = records
    .filter((val) => val.difficulty < 10)
    .sort((a, b) => {
      const diff = b.difficulty - a.difficulty
      if (diff != 0) return diff
      return b.id - a.id
    })
    .sort(sortAvalsPredicate)

  return (
    <div className='container mx-auto'>
      <div className='my-6 flex flex-row justify-center'>
        <a
          href={`/account/${username}`}
          className='flex gap-3 hover:text-default-700'
        >
          <Image alt='Cube' radius='none' src={iconAvatar} width={40} />
          <div className='flex flex-col justify-center'>
            <p className='text-2xl'>{username}</p>
          </div>
        </a>
      </div>
      <div className='flex flex-col gap-4'>
        {extremes.length != 0 ? (
          <DifficultySection title='Extreme Demons' records={extremes} />
        ) : null}
        {insanes.length != 0 ? (
          <DifficultySection title='Insane Demons' records={insanes} />
        ) : null}
        {demons.length != 0 ? (
          <DifficultySection title='Demons' records={demons} />
        ) : null}
        {noDemons.length != 0 ? (
          <DifficultySection title='Demás Dificultades' records={noDemons} />
        ) : null}
        {records.length == 0 && !loading ? (
          <div className='flex flex-row justify-center text-lg'>
            Este usuario no tiene ningún record disponible.
          </div>
        ) : null}
        {loading ? (
          <div className='flex flex-row justify-center text-lg'>
            Cargando datos
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default AccountRecordsPage
