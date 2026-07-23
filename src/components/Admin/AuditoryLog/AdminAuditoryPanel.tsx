'use client'
import { getLogsAction } from '@/actions/admin/auditorylogActions'
import TablaHeader from '@/components/Admin/TablaHeader'
import { useEffect, useState } from 'react'
import { Spinner, Pagination } from '@heroui/react'
import type LogMessage from '@/models/LogMessage'

const AdminAuditoryPanel = ({ home = false }) => {
  const [data, setData] = useState([] as LogMessage[])
  const [page, setPage] = useState(0)
  const [maxPages, setMaxPages] = useState(2)
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 50 // esta tambien en getLogsAction

  const updateData = () => {
    setLoading(true)
    getLogsAction(page).then((response) => {
      const datos = JSON.parse(response) as LogMessage[]
      setMaxPages(Math.ceil((page * itemsPerPage + datos[0].id) / itemsPerPage))
      setData(datos)
      setLoading(false)
    })
  }

  useEffect(updateData, [page])

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    if (maxPages <= 7) {
      for (let i = 1; i <= maxPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (page > 3) {
        pages.push('ellipsis')
      }
      const start = Math.max(2, page - 1)
      const end = Math.min(maxPages - 1, page + 1)
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      if (page < maxPages - 2) {
        pages.push('ellipsis')
      }
      pages.push(maxPages)
    }
    return pages
  }

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
        <div className='flex flex-col items-center justify-center text-center'>
          <Spinner size='lg' />
          <span>Cargando datos...</span>
        </div>
      ) : (
        data.map((log, i) => (
          <p className='mt-1' key={i}>
            <span className='text-danger font-bold'>#{log.id}: </span>
            {log.message}
          </p>
        ))
      )}
      <div className='mt-5 flex flex-row justify-center'>
        <Pagination>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage((p) => p - 1)}
              >
                <Pagination.PreviousIcon />
                <span>Previous</span>
              </Pagination.Previous>
            </Pagination.Item>
            {getPageNumbers().map((p, i) =>
              p === 'ellipsis' ? (
                <Pagination.Item key={`ellipsis-${i}`}>
                  <Pagination.Ellipsis />
                </Pagination.Item>
              ) : (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === page}
                    onPress={() => setPage(p)}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              )
            )}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === maxPages}
                onPress={() => setPage((p) => p + 1)}
              >
                <span>Next</span>
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </div>
    </TablaHeader>
  )
}

export default AdminAuditoryPanel
