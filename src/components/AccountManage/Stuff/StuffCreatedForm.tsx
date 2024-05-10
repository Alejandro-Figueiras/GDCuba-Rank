'use client'
import { getLevelsFromGD } from '@/actions/levels/levels'
import type DictionaryObject from '@/helpers/DictionaryObject'
import { parseDifficulty } from '@/helpers/levelParser'
import type Level from '@/models/Level'
import { Button, Input } from '@nextui-org/react'

import {
  useRef,
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
  type MutableRefObject
} from 'react'

const StuffCreatedForm = ({
  itemData,
  setItemData
}: {
  itemData: DictionaryObject<any>
  setItemData: Dispatch<SetStateAction<DictionaryObject<any>>>
}) => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>
  const [selectedLevels, setSelectedLevels] = useState(
    itemData.levels as Level[]
  )
  const [searchResult, setSearchResult] = useState([] as Level[])

  const handleSearch = async () => {
    const value = inputRef.current?.value ?? ''
    const result = JSON.parse(await getLevelsFromGD({ data: value })) as Level[]
    console.log(result)
    setSearchResult(result)
  }

  const handleSelect = (level: Level) => {
    if (
      selectedLevels.length < 6 &&
      !selectedLevels.find((val) => val.id == level.id)
    ) {
      setSelectedLevels((levels) => [...levels, level])
    }
  }

  const handleUnselect = (level: Level) => {
    setSelectedLevels((levels) => levels.filter((val) => val.id != level.id))
  }

  useEffect(() => {
    setItemData((data) => {
      const newData = { ...data }
      newData.levels = selectedLevels
      return newData
    })
  }, [selectedLevels, setItemData])

  return (
    <>
      <div className='flex flex-row gap-2'>
        <Input
          type='text'
          size='md'
          placeholder='Nombre o ID Preferiblemente'
          label=''
          ref={inputRef}
        ></Input>
        <Button size='md' onClick={handleSearch}>
          Buscar
        </Button>
      </div>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
        <div className='flex flex-col'>
          <h2 className='text-sm text-default-500'>Busqueda</h2>
          {searchResult.map((level, i) => {
            const encontrado = !!selectedLevels.find(
              (val) => val.id == level.id
            )
            return (
              <LevelName
                level={level}
                key={i}
                hoverGreen={!encontrado}
                hoverRed={encontrado}
                green={encontrado}
                handleSelect={encontrado ? handleUnselect : handleSelect}
              />
            )
          })}
        </div>
        <div className='flex flex-col'>
          <h2 className='text-sm text-default-500'>Niveles Seleccionados</h2>
          {selectedLevels.map((level, i) => (
            <LevelName
              level={level}
              key={i}
              green
              handleSelect={handleUnselect}
              hoverRed
            />
          ))}
        </div>
      </div>
    </>
  )
}

const LevelName = ({
  level,
  handleSelect = () => {},
  green,
  hoverGreen,
  hoverRed
}: {
  level: Level
  handleSelect: (level: Level) => void
  green?: boolean
  hoverGreen?: boolean
  hoverRed?: boolean
}) => {
  const classNames = [
    'w-full flex gap-1 hover:underline hover:cursor-pointer',
    green && 'text-green-500',
    hoverGreen && 'hover:text-green-500',
    hoverRed && 'hover:text-danger'
  ]

  const diff = parseDifficulty(level)

  return (
    <>
      <div className={classNames.join(' ')} onClick={() => handleSelect(level)}>
        <div className='flex flex-col justify-center'>
          <img
            src={diff.path}
            style={{
              height: '16px'
            }}
            alt=''
          />
        </div>
        {level.levelname}
      </div>
    </>
  )
}

export default StuffCreatedForm
