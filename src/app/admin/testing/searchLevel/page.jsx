'use client'
import { useState, useRef } from "react"
import { Button, Input } from '@nextui-org/react'
import { getLevelByIDAction, getLevelsAction } from "@/actions/admin/getLevelAction"

import LevelCard from "../../../../components/Levels/LevelCard"
import { isNumeric } from "@/libs/utils"

export default () => {
  const inputRef = useRef()
  const [niveles, setNiveles] = useState([])
  
  const handleSearch = async(e) => {
    const query = inputRef.current.value
    
    if (isNumeric(query)) {
      const newLevel = JSON.parse(await getLevelByIDAction({id: parseInt(query)}));
      setNiveles([newLevel]);
    } else {
      const levels = JSON.parse(await getLevelsAction({query}));
      setNiveles(levels)
    }
  }

  return (
    <div className="w-100 m-4">
      <div className="flex flex-row align-middle justify-center gap-4">
        <Input type="text" size='sm' label="Search" className="w-96" ref={inputRef}/>
        <Button size="lg" onClick={handleSearch}>Buscar</Button>
      </div>
      <div className="mt-6 w-100 flex flex-col gap-4 mx-auto">
        {niveles.map(level => <LevelCard level={level}/>)}
      </div>
    </div>
  )
}