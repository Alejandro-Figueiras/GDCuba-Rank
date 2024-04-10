'use client'
import { getLatestAction } from "@/actions/admin/auditorylogActions";
import TablaHeader from "@/components/Admin/TablaHeader";
import { useEffect, useState } from 'react'

const AdminAuditoryPanel = ({home = false}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  // TODO improve loading

  const updateData = () => {
    (getLatestAction()).then(response => {
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
      {data.map(log => <p className="mt-1"><span className="text-bold">#{log.id}: </span>{log.message}</p>)}
    </TablaHeader>
  );
};

export default AdminAuditoryPanel;