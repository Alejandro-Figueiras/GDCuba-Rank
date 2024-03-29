'use client'
import { getAllUsersAction, getUnverifiedUsersAction } from "@/actions/admin/getAllUserAction";
import TablaHeader from "@/components/Admin/TablaHeader";
import TablaUsuarios from "@/components/Admin/Users/TablaUsuarios";
import { useEffect, useState } from 'react'

const AdminUsuariosPanel = ({home = false}) => {
  const [usuarios, setUsuarios] = useState([]);

  const updateData = () => {
    (home
      ? getUnverifiedUsersAction()
      : getAllUsersAction()
    ).then(response => {
      const nuevosUsuarios = JSON.parse(response)
      setUsuarios(nuevosUsuarios)
    })
  }

  useEffect(updateData, [])
  return (
    <TablaHeader title={home?"Usuarios (sin verificar)":"Usuarios"} buttons={[{
      text: "Refresh",
      handleClick: updateData
    }]}>
      <TablaUsuarios usuarios={usuarios} updateData={updateData}/>
    </TablaHeader>
  );
};

export default AdminUsuariosPanel;