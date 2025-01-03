'use client'
import { getLogsAction } from '@/actions/admin/auditorylogActions'
import TablaHeader from '@/components/Admin/TablaHeader'
import { useEffect, useState } from 'react'
import { Spinner, Pagination } from '@nextui-org/react'
import type LogMessage from '@/models/LogMessage'

const AdminAuditoryPanel = ({ home = false }) => {
  const [data, setData] = useState([] as LogMessage[])
  const [page, setPage] = useState(0)
  const [maxPages, setMaxPages] = useState(2)
  const [loading, setLoading] = useState(true)

  const updateData = () => {
    setLoading(true)
    getLogsAction(page).then((response) => {
      const datos = JSON.parse(response) as LogMessage[]
      setMaxPages(Math.ceil((page * 50 + datos[0].id) / 50))
      setData(datos)
      setLoading(false)
    })
  }

  useEffect(updateData, [page])
  return (
    <TablaHeader
      title={'Log General de Auditoría'}
      buttons={
        home
          ? []
          : [
              {
                text: 'Refresh',
                handleClick: updateData
              }
            ]
      }
    >
      {loading ? (
        <div className='flex flex-row items-center justify-center text-center'>
          <Spinner label='Cargando datos...' />
        </div>
      ) : (
        data.map((log, i) => (
          <p className='mt-1' key={i}>
            <span className='font-bold text-danger'>#{log.id}: </span>
            {log.message}
          </p>
        ))
      )}
      <div className='mt-5 flex flex-row justify-center'>
        <Pagination
          total={maxPages}
          initialPage={page + 1}
          onChange={(val) => setPage(val - 1)}
          isCompact
          showControls
        />
      </div>
    </TablaHeader>
  )
}

export default AdminAuditoryPanel
