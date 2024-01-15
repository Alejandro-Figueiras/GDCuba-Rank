'use client'
import { getAllUsersAction } from "@/actions/admin/getAllUserAction";
import TablaUsuarios from "@/components/Admin/TablaUsuarios";
import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'

export default () => {
  const [usuarios, setUsuarios] = useState([]);

  const updateData = () => {
    getAllUsersAction().then(response => {
      const nuevosUsuarios = JSON.parse(response)
      setUsuarios(nuevosUsuarios)
    })
  }

  useEffect(updateData, [])
  return (
    <div className="component px-8 py-4">
      <div className="flex justify-between">
        <h2 className="pt-4 pb-2 text-2xl">Usuarios</h2>
        <div className="flex">
          <Button onClick={updateData}>
            Refresh
          </Button>          
        </div>
      </div>
      <TablaUsuarios usuarios={usuarios} updateData={updateData}/>
    </div>
  );
};
