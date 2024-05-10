'use client'
import {
  getAllRecordsAction,
  getUnverifiedRecordsAction
} from '@/actions/admin/getRecordAction'
import TablaRecords from '@/components/Admin/Records/TablaRecords'
import { useEffect, useState } from 'react'
import TablaHeader from '@/components/Admin/TablaHeader'
import { useDisclosure } from '@nextui-org/react'
import SubmitRecordModal from '@/components/NewRecord/SubmitRecordModal'
import { type Record } from '@/models/Record'
import { notify } from '@/libs/toastNotifications'

const AdminRecordsPanel = ({ home = false }) => {
  const [records, setRecords] = useState([] as Record[])
  const [loading, setLoading] = useState(true)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const updateRecords = () => {
    ;(home ? getUnverifiedRecordsAction() : getAllRecordsAction()).then(
      (response) => {
        if (!response) {
          notify('Error al cargar los records', 'error')
          return
        }
        const nuevosRecords = JSON.parse(response) as Record[]
        nuevosRecords.sort((a, b) => {
          if (a.aval == -2 && b.aval != -2) return -1
          if (b.aval == -2 && a.aval != -2) return 1
          if (a.aval == 0 && b.aval != 0) return -1
          if (b.aval == 0 && a.aval != 0) return 1
          if (a.aval == -1 && b.aval != -1) return 1
          if (b.aval == -1 && a.aval != -1) return -1
          return b.id - a.id
        })
        setRecords(nuevosRecords)
        setLoading(false)
      }
    )
  }

  useEffect(updateRecords, [home])
  return (
    <TablaHeader
      title={home ? 'Records (Sin verificar)' : 'Records'}
      buttons={
        home
          ? []
          : [
              {
                text: 'Agregar Record',
                handleClick: onOpen
              },
              {
                text: 'Refresh',
                handleClick: updateRecords
              }
            ]
      }
    >
      <TablaRecords
        records={records}
        updateRecords={updateRecords}
        loading={loading}
      />
      <SubmitRecordModal isOpen={isOpen} onOpenChange={onOpenChange} admin />
    </TablaHeader>
  )
}

export default AdminRecordsPanel
