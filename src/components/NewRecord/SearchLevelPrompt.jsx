import { getLevelByIDAction, getLevelsAction } from "@/actions/admin/getLevelAction"
import { isNumeric } from "@/libs/utils"
import { useRef } from "react"
import { Button, Input } from '@nextui-org/react'
import { SearchIcon } from "../Icons/SearchIcon"

const SearchLevelPrompt = ({ setNiveles = ()=>{}, setNewLevel = ()=>{}}) => {
  const inputRef = useRef()
  
  const handleSearch = async(e) => {
    setNewLevel(null)
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
  <div className="flex flex-row align-middle justify-center gap-2">
    <Input type="text" placeholder="Escribe el nombre del nivel" size='lg' radius='sm' ref={inputRef} startContent={<SearchIcon />}/>
    <Button onClick={handleSearch} size="lg" radius="sm">Buscar</Button>
  </div>)
}

export default SearchLevelPrompt