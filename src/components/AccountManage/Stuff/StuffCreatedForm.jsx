'use client'
import { getLevelsFromGD } from '@/actions/levels/levels';
import {
  Button,
  Input
} from '@nextui-org/react'

import {
  useRef,
  useState
} from "react"

const StuffCreatedForm = ({itemData, setItemData}) => {
  const inputRef = useRef(null);
  const [selectedLevels, setSelectedLevels] = useState([])
  const [searchResult, setSearchResult] = useState([])

  const handleSearch = async() => {
    const value = inputRef.current.value
    const result = JSON.parse(await getLevelsFromGD({data: value}));
    console.log(result)
    setSearchResult(result)
  }

  const handleSelect = (level) => {
    if (selectedLevels.length < 6 &&
      !selectedLevels.find(val => val.id == level.id)
      ) {
        setSelectedLevels(levels => [...levels, level])
      }
  }

  const handleUnselect = (level) => {
    setSelectedLevels(levels => levels.filter(val => val.id != level.id))
  }

  return <>
    <div className='flex flex-row gap-2'>
      <Input type="text" size='sm' placeholder='Nombre o ID Preferiblemente' label='' ref={inputRef}></Input>
      <Button size='lg' onClick={handleSearch}>Buscar</Button>
    </div>
    <div className='grid grid-cols-2 gap-2'>
      <div className='flex flex-col'>
        <h2 className='text-sm text-default-500'>Busqueda</h2>
        {searchResult.map((level,i) => <LevelName level={level} key={i} hoverGreen handleSelect={handleSelect}/>)}
      </div>
      <div className='flex flex-col'>
        <h2 className='text-sm text-default-500'>Niveles Seleccionados</h2>
        {selectedLevels.map((level,i) => <LevelName level={level} key={i} green handleSelect={handleUnselect} hoverRed/>)}
      </div>
    </div>
  </>
}

const LevelName = ({level, handleSelect = () => {}, green, hoverGreen, hoverRed}) => {
  const classNames = [
    'w-full hover:underline hover:cursor-pointer',
    green && 'text-green-500',
    hoverGreen && 'hover:text-green-500',
    hoverRed && 'hover:text-danger'
  ]
  return <>
    <div className={classNames.join(' ')} onClick={() => handleSelect(level)}>{level.levelname}</div>
  </>
}

export default StuffCreatedForm;