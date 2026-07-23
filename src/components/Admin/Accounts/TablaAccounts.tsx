import { Table, Button, Spinner, EmptyState } from '@heroui/react'
import { useContext } from 'react'
import { ModalContext } from '@/app/context/ModalContext'
import { notify } from '@/libs/toastNotifications'
import UsernameCell from '@/components/Rank/UsernameCell'
import CubanCheckbox from './CubanCheckbox'
import { removeGDAccountAction } from '@/actions/admin/accountsActions'
import { type Account } from '@/models/Account'

const TablaAccounts = ({
  gdaccounts,
  updateAccounts,
  loading = false
}: {
  gdaccounts: Account[]
  updateAccounts: () => void
  loading?: boolean
}) => {
  const { openModal } = useContext(ModalContext)

  const handleDelete = async (acc: Account) => {
    openModal({
      title: `Eliminar Cuenta ${acc.username}`,
      desc: `¿Seguro que quieres eliminar esta cuenta?`,
      action: 'delete',
      onSubmit: async () => {
        const result = await removeGDAccountAction({ username: acc.username })
        if (result == 1) {
          notify(`Cuenta ${acc.username} eliminada`, 'success')
        } else {
          notify(`Error al eliminar la cuenta ${acc.username}`, 'error')
        }
        updateAccounts()
      }
    })
  }

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          className={loading ? 'min-h-75' : ''}
          aria-label='Todos los records'
        >
          <Table.Header>
            <Table.Column>ID</Table.Column>
            <Table.Column isRowHeader>Usuario</Table.Column>
            <Table.Column>Cubano</Table.Column>
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
                    No hay cuentas para mostrar
                  </span>
                )}
              </EmptyState>
            )}
          >
            {gdaccounts &&
              gdaccounts.map((acc) => (
                <Table.Row key={acc.id}>
                  <Table.Cell>{acc.id}</Table.Cell>
                  <Table.Cell>
                    <UsernameCell player={acc} />
                  </Table.Cell>
                  <Table.Cell>
                    <CubanCheckbox
                      acc={acc}
                      updateData={updateAccounts}
                      openModal={openModal}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      size='sm'
                      variant='danger'
                      onPress={() => handleDelete(acc)}
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

    //     </TableBody>
    //   </Table>
    // </>
  )
}

export default TablaAccounts
