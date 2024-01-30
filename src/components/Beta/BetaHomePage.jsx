import React from 'react'
import './beta.css'

export default function BetaHomePage() {

  return (
    <div className='m-4 flex flex-col text-center justify-center' style={{
      minHeight: 'calc(100dvh - 65px - 2rem)'
    }}>
      <div className='max-w-[800px] mx-auto'>
        <h1 className='text-3xl font-bold'>Beta Cerrada</h1>
        <p className='text-xl font-semibold mb-4'>Fase 1: Completando Features</p>
        <p className='mb-2'>Recomiendo mucho que no se esfuercen en poner todos los datos y estadisticas reales, sino que para que sea más fácil encontrar bugs, se utilicen datos que no son 100% verídicos. Recuerdo que estamos en una fase de pruebas.</p>
        <p>En la última fase pre-release se hará un reset de la base de datos y todo lo que hallan hecho será eliminado.</p>
      </div>

    </div>
  )
}
