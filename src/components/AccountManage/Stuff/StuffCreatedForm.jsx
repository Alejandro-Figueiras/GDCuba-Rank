'use client'
import {
  Button,
  Input
} from '@nextui-org/react'

const StuffCreatedForm = ({itemData, setItemData}) => {
  
  return <>
    <div className='flex flex-row gap-2'>
      <Input type="text" size='sm' placeholder='Nombre o ID Preferiblemente' label=''></Input>
      <Button size='lg'>Buscar</Button>
    </div>
    <div className='grid grid-cols-2 gap-2'>
      <div className='flex flex-col'>
        <h2 className='text-sm text-default-500'>Busqueda</h2>
        <div className='w-full'>ads</div>
      </div>
      <div className='flex flex-col'>
        <h2 className='text-sm text-default-500'>Niveles Seleccionados</h2>
      </div>
    </div>
  </>
}

export default StuffCreatedForm;