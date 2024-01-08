'use client'
import SearchLevel from '@/components/NewRecord/SearchLevel'
import { useState } from 'react'
import LevelCard from '@/components/Levels/LevelCard'
import { Input, Slider, Button } from '@nextui-org/react'

const NewRecord = () => {
  const [level, setLevel] = useState(null)
  
  return (<div className="max-w-[900px] mx-auto mt-8">
    <h1 className="text-3xl text-center mb-5">Nuevo Record</h1>
    <SearchLevel setNewLevel={setLevel}/>
    {level && <>
      <h2 className='text-2xl text-center mb-4'>Selección</h2>
      <LevelCard level={level} />
      <div className='my-2'>
        <Slider
          color='success'
          step={1}
          maxValue={100}
          minValue={0}
          defaultValue={100}
          label="Porciento Completado"
          className="max-w-md"
        />
        <Input type="text" placeholder="YouTube Video URL" size='sm'/>
        <Button color="primary">Agregar Record</Button>
        <Button>Eliminar</Button>
      </div>
    </>}
  </div>)
}

export default NewRecord;