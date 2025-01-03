'use client'

import type Level from '@/models/Level'
import LevelCardTiny from '../Levels/LevelCardTiny'
import SearchLevelPrompt from './SearchLevelPrompt'
import { type MouseEventHandler, useState } from 'react'

const SearchLevel = ({
  setNewLevel = () => {}
}: {
  setNewLevel: (newVal: Level | undefined) => void
}) => {
  const [niveles, setNiveles] = useState([] as Level[])
  const [empty, setEmpty] = useState(false)

  const handleSelect: (level: Level) => MouseEventHandler<HTMLButtonElement> = (
    level
  ) => {
    return () => {
      setNewLevel(level)
      setNiveles([])
    }
  }

  return (
    <>
      <div className='w-100'>
        <SearchLevelPrompt
          setNiveles={setNiveles}
          setNewLevel={setNewLevel}
          setEmpty={setEmpty}
        />
        <div className='mx-auto mt-6 grid grid-cols-1 justify-items-center gap-2'>
          {niveles.slice(0, 5).map((level, i) => (
            <button onClick={handleSelect(level)} key={i} className={`w-full`}>
              <LevelCardTiny level={level} hover={true} />
            </button>
          ))}
          {empty && 'No se encontraron resultados'}
        </div>
      </div>
    </>
  )
}

export default SearchLevel
