'use client'
import { getAllUsersAction } from "@/actions/admin/getUserAction";
import TablaUsuarios from "@/components/Admin/TablaUsuarios";
import { useEffect, useState } from 'react'
export default () => {
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    getAllUsersAction().then(response => {
      const nuevosUsuarios = JSON.parse(response)
      setUsuarios(nuevosUsuarios)
    })

  }, [])
  return (
    <div className="component px-8 py-4">
      <h2 className="pt-4 pb-2 text-2xl">Usuarios</h2>
      <TablaUsuarios usuarios={usuarios} />
    </div>
  );
};
