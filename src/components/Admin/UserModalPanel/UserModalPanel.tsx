import { ModalContext } from '@/app/context/ModalContext'
import { notify } from '@/libs/toastNotifications'
import { Modal, Button, Spinner, Key } from '@heroui/react'
import React, { useContext, useEffect, useState } from 'react'

import BodyCard from './BodyCard'
import CardSelect from './CardSelect'
import AccountStatsRow from './AccountStatsRow'
import AccountIconsRow from './AccountIconsRow'
import AccountInfoColumn from './AccountInfoColumn'
import { ROLES, STATUS } from './selectKeys'
import { validateUserAction } from '@/actions/admin/validateUserAction'
import { banUserAction } from '@/actions/admin/banUserAction'
import { removeUserAction } from '@/actions/admin/removeUserAction'
import { useSesion } from '@/hooks/useSesion'
import { changeUserRoleAction } from '@/actions/admin/changeUserRoleAction'
import { type UserInCheck } from '@/app/context/AdminContext'
import { type Account } from '@/models/Account'
import { type User } from '@/models/User'

export default function UserModalPanel({
  userInfo,
  isOpen,
  setOpen,
  isLoading
}: {
  userInfo: UserInCheck | undefined
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  isLoading: boolean
}) {
  const { currentUser } = useSesion()
  const [loadingExtra, setLoadingExtra] = useState(false)

  const [oldValues, setOldValues] = useState({
    role: userInfo?.user.role ?? '',
    status: userInfo?.user.status ?? ''
  })

  const [changes, setChanges] = useState([] as string[])
  const [fields, setFields] = useState<{
    role?: string
    status?: string
  }>({})

  const { openModal } = useContext(ModalContext)

  const handleSelectionChange = (
    key: Key | null,
    whatChange: 'role' | 'status'
  ) => {
    if (!key || key == '') return
    console.log(key.toString())
    setFields((prev) => ({ ...prev, [whatChange]: key.toString() }))
    if (key != oldValues[whatChange] && !changes.includes(whatChange)) {
      setChanges((prev) => [...prev, whatChange])
    } else {
      setChanges((prev) => prev.filter((v) => v != whatChange))
    }
  }

  useEffect(() => {
    setLoadingExtra(false)
    setFields({
      role: userInfo?.user.role,
      status: userInfo?.user.status
    })
    setOldValues({
      role: userInfo?.user.role ?? '',
      status: userInfo?.user.status ?? ''
    })
    setChanges([])
  }, [userInfo])

  const handleDelete = () => {
    if (!userInfo?.user) return
    openModal({
      title: `Eliminar ${userInfo.user.username}`,
      desc: `¿Seguro que quieres eliminar a ${userInfo.user.username}`,
      onSubmit: async () => {
        const result = JSON.parse(
          await removeUserAction({ username: userInfo.user.username })
        )

        if (result) {
          notify(`Usuario ${userInfo?.user.username} eliminado`, 'success')
          setOpen(false)
        } else {
          notify(`Error al eliminar a ${userInfo?.user.username}`, 'error')
          setOpen(false)
        }

        if (userInfo?.updateData) userInfo.updateData()
      },
      action: 'delete'
    })
  }

  const handleUpdate = async () => {
    if (!userInfo?.user) return
    for (const change of changes) {
      if (change == 'status') {
        if (fields[change] == 'b') {
          await banUserAction({ user: userInfo.user.username })
        } else if (fields[change] == 'v') {
          await validateUserAction({
            user: userInfo.user.username,
            unvalidate: false
          })
        } else {
          await validateUserAction({
            user: userInfo.user.username,
            unvalidate: true
          })
        }
      } else if (change == 'role' && currentUser.role == 'owner') {
        const role =
          fields.role == 'owner'
            ? 'owner'
            : fields.role == 'admin'
              ? 'admin'
              : 'user'
        await changeUserRoleAction({ user: userInfo.user.username, role })
      }
    }
    if (userInfo?.updateData) userInfo.updateData()
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setOpen}
      // scrollBehavior='inside'
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className={!isLoading ? 'max-w-180' : undefined}>
            <Modal.Header className='flex flex-col gap-1 text-center'>
              <Modal.Heading>{userInfo?.user.username}</Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>

            {isLoading || loadingExtra ? (
              <Modal.Body className='my-6 flex h-10 w-full flex-col items-center justify-center p-2'>
                <Spinner />
              </Modal.Body>
            ) : (
              <>
                <Modal.Body>
                  <AccountStatsRow user={userInfo?.account as Account} />
                  <AccountIconsRow user={userInfo?.account as Account} />
                  <div className='grid h-75 grid-cols-3 gap-2 pt-2'>
                    {/* grid grid-cols-[0.5fr,_1fr] gap-2 */}
                    <AccountInfoColumn
                      user={userInfo?.user as User}
                      canResetPw={currentUser.role == 'owner'}
                    />
                    <BodyCard
                      cardTitle={'Datos y Permisos'}
                      className='col-span-2'
                    >
                      <CardSelect
                        items={ROLES}
                        label={'Nivel'}
                        value={fields.role as Key}
                        setValue={(key) => handleSelectionChange(key, 'role')}
                        isDisabled={currentUser.role != 'owner'}
                      />
                      <CardSelect
                        items={STATUS}
                        label={'Estado'}
                        value={fields.status as Key}
                        setValue={(key) => handleSelectionChange(key, 'status')}
                        isDisabled={
                          userInfo?.user.role != 'user' &&
                          currentUser.role != 'owner'
                        }
                      />
                    </BodyCard>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onPress={async () => {
                      setLoadingExtra(true)
                      await handleUpdate()
                      setOpen(false)
                    }}
                    isDisabled={changes.length == 0}
                  >
                    Actualizar
                  </Button>
                  {(userInfo?.user.role == 'user' ||
                    currentUser.role == 'owner') && (
                    <Button variant='danger' onClick={() => handleDelete()}>
                      Eliminar
                    </Button>
                  )}
                  <Button variant='tertiary' onPress={() => setOpen(false)}>
                    Cancelar
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
