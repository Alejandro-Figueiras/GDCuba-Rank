'use client'
import { useState, useRef } from "react"
import { Button, Input } from '@nextui-org/react'
import { getLevelByIDAction } from "@/actions/admin/getLevelAction"

export default () => {
  const inputRef = useRef()
  const [nivel, setNivel] = useState({})

  const handleSearch = async(e) => {
    const ID = parseInt(inputRef.current.value)
    if (ID) {
      console.log("Paso", ID)
      console.log(ID)
      const newLevel = JSON.parse(await getLevelByIDAction({id:ID}));
      setNivel(newLevel);
      console.log(newLevel)
    }
  }

  return (
    <div className="w-100 m-4">
      <p>Dark Odyssey: 69010770</p>
      <p>Coaster Mountain: 98170000</p>
      <div className="flex flex-row align-middle justify-center gap-4">
        <Input type="text" label="Level ID" className="w-96" ref={inputRef}/>
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
      <div className="mt-6 w-100">
        {(nivel.levelname) ? (
          <div>
            <p>{nivel.levelname} by {nivel.author}</p>
            <p className="flex"><img src={`/assets/stats/${(nivel.platformer?'moons':'stars')}Icon.png`} alt="Stars" style={{height: '24px'}}/> {nivel.stars}</p>
            <p className="flex">Dificultad: <img src={`/assets/dificultades/${'easy'}_icon.png`}/></p>
          </div>
        ):<p className='text-center'>{nivel == -1 ? "No existe este nivel" : 'Vacío.'}</p>}
      </div>
    </div>
  )
}