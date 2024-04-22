'use client'
import { getLatestAction } from "@/actions/admin/auditorylogActions";
import TablaHeader from "@/components/Admin/TablaHeader";
import { useEffect, useState } from 'react'
import { Spinner } from '@nextui-org/react'

const AdminAuditoryPanel = ({home = false}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  const updateData = () => {
    setLoading(true);
    getLatestAction().then(response => {
      const datos = JSON.parse(response)
      setData(datos)
      setLoading(false)
    })
  }

  useEffect(updateData, [])
  return (
    <TablaHeader title={"Log General de Auditoría"} buttons={home?[]:[{
      text: "Refresh",
      handleClick: updateData
    }]}>
      {
        loading ? <div className="flex flex-row justify-center items-center text-center">
          <Spinner label="Cargando datos..." />
        </div> : 
        data.map((log, i) => <p className="mt-1" key={i}><span className="font-bold text-danger">#{log.id}: </span>{log.message}</p>)
      }
    </TablaHeader>
  );
};

export default AdminAuditoryPanel;