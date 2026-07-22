'use client'
import {
  getDifficultyNameByNumber,
  getDifficultyPath
} from '@/helpers/levelParser'
import { Table, Button, Link, Spinner, EmptyState } from '@heroui/react'
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
          notify(`Record #${record.id} eliminado`, 'success')
        } else {
          notify(`Error al eliminar a ${record.id}`, 'error')
        }
        updateRecords()
      }
    })
  }

  return (
    <>
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label='Todos los records'
            className={loading ? 'min-h-75' : ''}
          >
            <Table.Header>
              <Table.Column>ID</Table.Column>
              <Table.Column isRowHeader>Usuario</Table.Column>
              <Table.Column>Nivel</Table.Column>
              <Table.Column>Porcentaje</Table.Column>
              <Table.Column>Video</Table.Column>
              <Table.Column>Aval</Table.Column>
              <Table.Column>Acciones</Table.Column>
            </Table.Header>

            <Table.Body
              renderEmptyState={() => (
                <EmptyState className='flex h-full w-full flex-col items-center justify-center gap-4 text-center'>
                  {loading ? (
                    <>
                      <Spinner className='text-muted size-6' />
                      <span className='text-muted text-sm'>Cargando datos</span>
                    </>
                  ) : (
                    <span className='text-muted text-sm'>
                      No hay records para mostrar
                    </span>
                  )}
                </EmptyState>
              )}
            >
              {records &&
                records.map((record) => (
                  <Table.Row key={record.id}>
                    <Table.Cell>{record.id}</Table.Cell>
                    <Table.Cell>{record.username}</Table.Cell>
                    <Table.Cell>
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
                    </Table.Cell>
                    <Table.Cell>{record.percent}%</Table.Cell>
                    <Table.Cell>
                      {record.video != '' ? (
                        <Link className='cursor-pointer' href={record.video}>
                          Video
                        </Link>
                      ) : (
                        <p>No Tiene</p>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <RecordAvalDropdown record={record} />
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        size='sm'
                        variant='danger'
                        onPress={() => handleDelete(record)}
                      >
                        Eliminar
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </>
  )
}

export default TablaRecords
