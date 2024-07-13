import {
  getLevelByIDAction,
  getLevelsAction
} from '@/actions/admin/getLevelAction'
import { isNumeric } from '@/libs/utils'
import { MouseEventHandler, MutableRefObject, useRef } from 'react'
import { Button, Input } from '@nextui-org/react'
import SearchIcon from '../Icons/SearchIcon'
import type Level from '@/models/Level'

const SearchLevelPrompt = ({
  setNiveles = () => {},
  setNewLevel = () => {},
  setEmpty = () => {}
}: {
  setNiveles: (newVal: Level[]) => void
  setNewLevel: (newVal: Level | undefined) => void
  setEmpty: (newVal: boolean) => void
}) => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>

  const handleSearch: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setNewLevel(undefined)
    const query = inputRef.current.value

    if (isNumeric(query)) {
      const newLevel = JSON.parse(
        await getLevelByIDAction({ id: parseInt(query) })
      ) as Level | -1
      setEmpty(newLevel == -1)
      setNiveles(newLevel != -1 ? [newLevel as Level] : [])
    } else {
      const levels = JSON.parse(await getLevelsAction({ query })) as Level[]
      setEmpty(!levels.length)
      setNiveles(levels)
    }
  }

  return (
    <div className='flex flex-row justify-center gap-2 align-middle'>
      <Input
        type='text'
        placeholder='Escribe el nombre del nivel'
        size='lg'
        radius='sm'
        ref={inputRef}
        startContent={<SearchIcon />}
      />
      <Button onClick={handleSearch} size='lg' radius='sm'>
        Buscar
      </Button>
    </div>
  )
}

export default SearchLevelPrompt
