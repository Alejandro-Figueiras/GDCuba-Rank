'use client'
import { useState, useRef } from "react"
import { Button, Input } from '@nextui-org/react'
import { getLevelByIDAction } from "@/actions/admin/getLevelAction"

import LevelCard from "../../../../components/Levels/LevelCard"

export default () => {
  const inputRef = useRef()
  const [nivel, setNivel] = useState({})
  
  const handleSearch = async(e) => {
    const ID = parseInt(inputRef.current.value)
    if (ID) {
      const newLevel = JSON.parse(await getLevelByIDAction({id:ID}));
      setNivel(newLevel);
    }
  }

  return (
    <div className="w-100 m-4">
      <p>Dark Odyssey: 69010770</p>
      <p>Coaster Mountain: 98170000</p>
      <div className="flex flex-row align-middle justify-center gap-4">
        <Input type="text" label="Level ID" className="w-96" ref={inputRef}/>
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
      <div className="mt-6 w-100">
        {(nivel.levelname) ? (
          <LevelCard level={nivel}/>
        ):<p className='text-center'>{nivel == -1 ? "No existe este nivel" : 'Vacío.'}</p>}
      </div>
    </div>
  )
}