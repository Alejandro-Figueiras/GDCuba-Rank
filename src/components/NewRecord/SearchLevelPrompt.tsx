import {
  getLevelByIDAction,
  getLevelsAction
} from '@/actions/admin/getLevelAction'
import { isNumeric } from '@/libs/utils'
import { MouseEventHandler, MutableRefObject, useRef, useState } from 'react'
import { Button, Input, InputGroup, TextField } from '@heroui/react'
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
  const [value, setValue] = useState('')

  const handleSearch = async () => {
    setNewLevel(undefined)
    if (isNumeric(value)) {
      const newLevel = JSON.parse(
        await getLevelByIDAction({ id: parseInt(value) })
      ) as Level | -1
      setEmpty(newLevel == -1)
      setNiveles(newLevel != -1 ? [newLevel as Level] : [])
    } else {
      const levels = JSON.parse(
        await getLevelsAction({ query: value })
      ) as Level[]
      setEmpty(!levels.length)
      setNiveles(levels)
    }
  }

  return (
    <div className='flex w-full flex-row gap-2'>
      <TextField value={value} onChange={setValue} className='grow'>
        <InputGroup variant='secondary' fullWidth>
          <InputGroup.Prefix>
            <SearchIcon />
          </InputGroup.Prefix>
          <InputGroup.Input
            placeholder='Escribe el nombre del nivel'
            className='h-10'
          />
        </InputGroup>
      </TextField>
      <Button
        onPress={handleSearch}
        size='lg'
        variant='tertiary'
        className='shrink'
      >
        Buscar
      </Button>
    </div>
  )
}

export default SearchLevelPrompt
