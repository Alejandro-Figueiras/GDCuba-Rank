'use client'
import SearchLevel from '@/components/NewRecord/SearchLevel'
import { useState, useRef, useEffect } from 'react'
import LevelCard from '@/components/Levels/LevelCard'
import { Input, Slider, Button } from '@nextui-org/react'
import { submitRecord } from '@/actions/record/submitRecord'
import SubmitResult from './SubmitResult'

const NewRecord = () => {
  const [level, setLevel] = useState(null)
  const [submitResult, setSubmitResult] = useState(0)
  const sliderValue = useRef(100);
  const videoRef = useRef(null)

  const handleSubmit = async() => {
    const percent = sliderValue.current
    const video = videoRef.current.value

    const submitResult = await submitRecord({
      percent, video
    }, level)
    
    setSubmitResult(submitResult)
  }
  
  return ((submitResult==0)?<div className="max-w-[900px] mx-auto mt-8">
    <h1 className="text-3xl text-center mb-5">Nuevo Record</h1>
    <SearchLevel setNewLevel={setLevel}/>
    {level && <>
      <h2 className='text-2xl text-center mb-4'>Selección</h2>
      <LevelCard level={level} />
      <div className='my-2'>
        <Slider
          color='success'
          step={1}
          onChange={value => {
            sliderValue.current=value
          }}
          maxValue={100}
          minValue={0}
          defaultValue={100}
          label="Porciento Completado"
          className="max-w-md"
        />
        {/* TODO verificar el video de YT */}
        <Input type="text" ref={videoRef} placeholder="YouTube Video URL (Opcional)" size='sm'/>
        <Button color="primary" onClick={handleSubmit}>Agregar Record</Button>
        <Button>Eliminar</Button>
      </div>
    </>}
  </div>:<SubmitResult submitResult={submitResult} />)
}

export default NewRecord;