import { getLevelByIDAction, getLevelsAction } from "@/actions/admin/getLevelAction"
import { isNumeric } from "@/libs/utils"
import { useRef } from "react"
import { Button, Input } from '@nextui-org/react'

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
  <div className="flex flex-row align-middle justify-center gap-4">
    <Input type="text" label="Search" className="w-96" size='sm' ref={inputRef}/>
    <Button onClick={handleSearch} size="lg" radius="sm">Buscar</Button>
  </div>)
}

export default SearchLevelPrompt