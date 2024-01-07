'use client'
import { useState, useRef } from "react"
import { Button, Input } from '@nextui-org/react'
import { getLevelByIDAction, getLevelsAction } from "@/actions/admin/getLevelAction"

import { isNumeric } from "@/libs/utils"
import LevelCard from "../Levels/LevelCard"

const SearchLevel = ({ setNewLevel = ()=>{}}) => {
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
  
  const handleSelect = (level) => {
    return (event) => {
      setNewLevel(level)
    }
  }

  return (
    <div className="w-100 m-4">
      <div className="flex flex-row align-middle justify-center gap-4">
        <Input type="text" label="Search" className="w-96" size='sm' ref={inputRef}/>
        <Button onClick={handleSearch} size="lg" radius="sm">Buscar</Button>
      </div>
      <div className="mt-6 w-100 flex flex-col gap-4 mx-auto">
        {niveles.map((level, i) => 
          <button onClick={handleSelect(level)} key={i}>
            <LevelCard level={level}/>
          </button>
        )}
      </div>
    </div>
  )  
}

export default SearchLevel