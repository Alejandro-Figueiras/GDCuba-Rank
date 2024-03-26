'use client'
import { getAllUsersAction } from "@/actions/admin/getAllUserAction";
import TablaHeader from "@/components/Admin/TablaHeader";
import TablaUsuarios from "@/components/Admin/TablaUsuarios";
import { useEffect, useState } from 'react'

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
    <TablaHeader title="Usuarios" buttons={[{
      text: "Refresh",
      handleClick: updateData
    }]}>
      <TablaUsuarios usuarios={usuarios} updateData={updateData}/>
    </TablaHeader>
  );
};
