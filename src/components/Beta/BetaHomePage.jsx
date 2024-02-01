'use client'
import { useState, useEffect } from 'react'
import { getProjectVersion } from '@/actions/getVersion'
export default function BetaHomePage() {

  const [version, setVersion] = useState(null)
  useEffect(() => {
    getProjectVersion().then(setVersion)
  }, [])

  return (
    <div className='m-4 flex flex-col text-center justify-center global-full-height'>
      <div className='container max-w-[800px] mx-auto'>
        <h1 className='text-3xl font-bold'>Beta Cerrada</h1>
        <p className='text-xl font-semibold mb-4'>Fase 1: Completando Features</p>
        <p className='mb-2'>Recomiendo mucho que no se esfuercen en poner todos los datos y estadisticas reales, sino que para que sea más fácil encontrar bugs, se utilicen datos que no son 100% verídicos. Recuerdo que estamos en una fase de pruebas.</p>
        <p className='mb-4'>En la última fase pre-release se hará un reset de la base de datos y todo lo que hallan hecho será eliminado.</p>
        {version && <p className='text-sm font-medium text-default-500'>v{version}</p>}
      </div>

    </div>
  )
}
