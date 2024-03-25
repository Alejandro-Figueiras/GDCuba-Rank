'use client'
import { updateLandingStatsAll } from '@/database/db.staticInfo'
import {Button } from '@nextui-org/react'

export default () => {
  console.log("ASD")

  const handleClick = async() => {
    updateLandingStatsAll().catch(err => console.log(err))
  }

  return (
    <div className="w-100 m-4">
      <p>Este botón es solo para testing, la salida se hará por la consola del navegador</p>
      <Button onClick={handleClick}>Calcular</Button>
    </div>
  )
}