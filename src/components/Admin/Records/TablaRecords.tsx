'use client'
import {
  getDifficultyNameByNumber,
  getDifficultyPath
} from '@/helpers/levelParser'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Link,
  Spinner
} from '@nextui-org/react'
import RecordAvalDropdown from './RecordAvalDropdown'
import { removeRecord } from '@/actions/admin/changeRecord'
import { useContext } from 'react'
import { ModalContext } from '@/app/context/ModalContext'
import { notify } from '@/libs/toastNotifications'
import { type Record } from '@/models/Record'

const TablaRecords = ({
  records,
  updateRecords,
  loading = false
}: {
  records: Record[]
  updateRecords: () => void
  loading?: boolean
}) => {
  const { openModal } = useContext(ModalContext)

  const handleDelete = async (record: Record) => {
    openModal({
      title: `Eliminar Record #${record.id}`,
      desc: `¿Seguro que quieres eliminar este Record`,
      action: 'delete',
      onSubmit: async () => {
        const result = await removeRecord({ id: record.id })

        if (result) {
          const success = notify(`Record #${record.id} eliminado`, 'success')
        } else {
          const error = notify(`Error al eliminar a ${record.id}`, 'error')
        }
        updateRecords()
      }
    })
  }

  return (
    <>
      <Table
        aria-label='Todos los records'
        classNames={{ table: loading ? 'min-h-[300px]' : '' }}
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Nivel</TableColumn>
          <TableColumn>Porcentaje</TableColumn>
          <TableColumn>Video</TableColumn>
          <TableColumn>Aval</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<Spinner label='Cargando datos...' />}
          emptyContent={loading ? null : 'No hay records para mostrar'}
        >
          {records &&
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.username}</TableCell>
                <TableCell>
                  <div className='flex gap-2 align-middle'>
                    <img
                      src={getDifficultyPath({
                        featured: record.featured,
                        difficultyName: getDifficultyNameByNumber(
                          record.difficulty
                        )
                      })}
                      style={{ height: '24px' }}
                      alt=''
                    />

                    {record.levelname}
                  </div>
                </TableCell>
                <TableCell>{record.percent}%</TableCell>
                <TableCell>
                  {record.video != '' ? (
                    <Link
                      isExternal
                      className='cursor-pointer'
                      href={record.video}
                    >
                      Video
                    </Link>
                  ) : (
                    <p>No Tiene</p>
                  )}
                </TableCell>
                <TableCell>
                  <RecordAvalDropdown record={record} />
                </TableCell>
                <TableCell>
                  <Button
                    size='sm'
                    color='danger'
                    onClick={(e) => handleDelete(record)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

export default TablaRecords
