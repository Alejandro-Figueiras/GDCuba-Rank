'use client'
import SearchLevel from '@/components/NewRecord/SearchLevel'
import { useState } from 'react'

const NewRecord = () => {
  const [level, setLevel] = useState(null)
  
  return (<div className="max-w-[800px] mx-auto mt-8">
    <h1 className="text-3xl text-center mb-5">Agrega un Nuevo Record</h1>
    {level==null
    ? <SearchLevel setNewLevel={setLevel}/>
    : level.levelname}
  </div>)
}

export default NewRecord;