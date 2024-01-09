'use client'

import LevelCardTiny from "../Levels/LevelCardTiny"
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
    <div className="w-100">
      <SearchLevelPrompt setNiveles={setNiveles} setNewLevel={setNewLevel}/>
      <div className="mt-6 grid grid-cols-1 gap-2 mx-auto justify-items-center">
        {niveles.slice(0,5).map((level, i) => 
          <button onClick={handleSelect(level)} key={i} className={`w-fit`}>
            <LevelCardTiny level={level} hover={true}/>
          </button>
        )}
      </div>
    </div>
  </>
  )  
}

export default SearchLevel