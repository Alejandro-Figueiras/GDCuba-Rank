'use client'
import { AdminContext } from '@/app/context/AdminContext'
import { type User } from '@/models/User'
import { Chip, Table, Link, Spinner, EmptyState } from '@heroui/react'
import { useContext } from 'react'

const renderRoleOrStatus = (arg: string) => {
  let color: 'default' | 'success' | 'warning' | 'danger' | undefined,
    texto: string | undefined
  switch (arg) {
    case 'user':
      color = 'default'
      texto = 'Usuario'
      break
    case 'admin':
      color = 'success'
      texto = 'Admin'
      break
    case 'owner':
      color = 'success'
      texto = 'Owner'
      break
    case 'v':
      color = 'default'
      texto = 'Verificado'
      break
    case 'u':
      color = 'warning'
      texto = 'No Verificado'
      break
    case 'b':
      color = 'danger'
      texto = 'Baneado'
      break
  }

  return (
    <Chip size='sm' variant='soft' color={color}>
      <span className='text-xs capitalize'>{texto ?? 'Desconocido'}</span>
    </Chip>
  )
}

export const getWhatsAppURL = (phone: string) => {
  return `http://wa.me/${phone}`
}

const TablaUsuarios = ({
  usuarios,
  updateData,
  loading = false
}: {
  usuarios: User[]
  updateData: () => void
  loading?: boolean
}) => {
  const { openUserGestorFor } = useContext(AdminContext)
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          className={loading ? 'min-h-75' : ''}
          aria-label='Todos los usuarios'
        >
          <Table.Header>
            <Table.Column>ID</Table.Column>
            <Table.Column isRowHeader>Usuario</Table.Column>
            <Table.Column>Teléfono</Table.Column>
            <Table.Column>Rol</Table.Column>
            <Table.Column>Estado</Table.Column>
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
                    No hay usuarios para mostrar
                  </span>
                )}
              </EmptyState>
            )}
          >
            {usuarios &&
              usuarios.map((user) => (
                <Table.Row
                  key={user.id}
                  className='cursor-pointer duration-75 hover:bg-zinc-700'
                  onAction={() => openUserGestorFor(user, updateData)}
                >
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>
                    <Link
                      href={getWhatsAppURL(user.phone)}
                      className='text-white underline'
                    >
                      {user.phone}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{renderRoleOrStatus(user.role)}</Table.Cell>
                  <Table.Cell>{renderRoleOrStatus(user.status)}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}

export default TablaUsuarios
