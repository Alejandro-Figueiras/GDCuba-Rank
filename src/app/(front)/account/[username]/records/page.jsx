'use client'
import { getAllRecordsUserAction } from '@/actions/record/getAllRecordsUser'
import RecordCard from '@/components/Records/RecordCard'
import { useState, useEffect } from 'react'

const AccountRecordsPage = ({params}) => {
  const [records, setRecords] = useState([])
  const [extremes, setExtremes] = useState([])
  const [insanes, setInsanes] = useState([])

  useEffect(() => {
    getAllRecordsUserAction(params.username).then(records => {
      records = JSON.parse(records)
      console.log(records)
      setRecords(records)
    })
  }, [params.username])

  useEffect(() => {
    setExtremes(records
      .filter(val => val.difficulty == 15)
      .sort((a,b) => b.difficultyscore - a.difficultyscore)
    )

    setInsanes(records
      .filter(val => val.difficulty == 14)
      .sort((a,b) => b.id - a.id)
    )
    
  }, [records])

  return (
    <div className="container mx-auto">
      <div className="max-w-[800px] mx-auto text-center">
        <h2>Extreme Demons</h2>
        <div className='flex flex-row flex-wrap justify-evenly'>
          {
            extremes.map((record,i) => <RecordCard record={record} key={i} className="m-2"/>)
          }
        </div>
      </div>
      <div className="max-w-[800px] text-center">
        <h2>Insane Demons</h2>
        {
          insanes.map((record,i) => <RecordCard record={record} key={i}/>)
        }
      </div>
      {/* <RecordCard record={records[0]} /> */}
    </div>
  )
}

export default AccountRecordsPage