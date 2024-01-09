'use client'

import LevelCard from "../Levels/LevelCard"
import SearchLevelPrompt from "./SearchLevelPrompt"
import { useState } from 'react'

const SearchLevel = ({ setNewLevel = ()=>{}, level}) => {
  const [niveles, setNiveles] = useState([])

  const handleSelect = (level) => {
    return (event) => {
      setNewLevel(level)
      setNiveles([])
    }
  }

  return (
    <>
    {(!level) && <div className="w-100">
      <SearchLevelPrompt setNiveles={setNiveles} setNewLevel={setNewLevel}/>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto justify-items-center">
        {niveles.map((level, i) => 
          <button onClick={handleSelect(level)} key={i} className={`w-fit`}>
            <LevelCard level={level} hover={true}/>
          </button>
        )}
      </div>
    </div>}
  </>
  )  
}

export default SearchLevel