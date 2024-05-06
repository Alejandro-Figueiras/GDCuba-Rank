import { ModalContext } from '@/app/context/ModalContext'
import { notify } from '@/libs/toastNotifications'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner
} from '@nextui-org/react'
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
import { type PressEvent } from '@react-types/shared'
import { type Account } from '@/models/Account'
import { type User } from '@/models/User'

export default function UserModalPanel({
  userInfo,
  isOpen,
  onOpenChange,
  isLoading
}: {
  userInfo: UserInCheck | undefined
  isOpen: boolean
  onOpenChange: () => void
  isLoading: boolean
}) {
  const { currentUser } = useSesion()
  const [loadingExtra, setLoadingExtra] = useState(false)

  const [oldValues, setOldValues] = useState({
    role: userInfo?.user.role ?? '',
    status: userInfo?.user.status ?? ''
  })

  const [changes, setChanges] = useState([] as string[])
  const [fields, setFields] = useState({
    role: new Set([] as string[]),
    status: new Set([] as string[])
  })

  const { openModal } = useContext(ModalContext)

  const handleSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    whatChange: 'role' | 'status'
  ) => {
    if (e.target.value == '') return

    const value = new Set([e.target.value])

    setFields((prev) => ({ ...prev, [whatChange]: value }))
    if (
      e.target.value != oldValues[whatChange] &&
      !changes.includes(e.target.value)
    ) {
      setChanges((prev) => [...prev, whatChange])
    } else {
      setChanges((prev) => prev.filter((v) => v != whatChange))
    }
  }

  useEffect(() => {
    setLoadingExtra(false)
    setFields({
      role: new Set([userInfo?.user.role ?? '']),
      status: new Set([userInfo?.user.status ?? ''])
    })
    setOldValues({
      role: userInfo?.user.role ?? '',
      status: userInfo?.user.status ?? ''
    })
    setChanges([])
  }, [userInfo])

  const handleDelete = (onClose: () => void) => {
    if (!userInfo?.user) return
    openModal({
      title: `Eliminar ${userInfo.user.username}`,
      desc: `¿Seguro que quieres eliminar a ${userInfo.user.username}`,
      onSubmit: async () => {
        const result = JSON.parse(
          await removeUserAction({ username: userInfo.user.username })
        )

        if (result) {
          const success = notify(
            `Usuario ${userInfo?.user.username} eliminado`,
            'success'
          )
          onClose()
        } else {
          const error = notify(
            `Error al eliminar a ${userInfo?.user.username}`,
            'error'
          )
          onClose()
        }

        if (userInfo?.updateData) userInfo.updateData()
      },
      action: 'delete'
    })
  }

  const handleUpdate = async (e: PressEvent) => {
    if (!userInfo?.user) return
    for (const change of changes) {
      if (change == 'status') {
        if (fields[change].has('b')) {
          await banUserAction({ user: userInfo.user.username })
        } else if (fields[change].has('v')) {
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
        const role = fields.role.has('owner')
          ? 'owner'
          : fields.role.has('admin')
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
      onOpenChange={onOpenChange}
      size={!isLoading ? '2xl' : undefined}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1 text-center'>
              {userInfo?.user.username}
            </ModalHeader>
            {isLoading || loadingExtra ? (
              <div className='my-6 flex h-10 w-full flex-col items-center justify-center p-2'>
                <Spinner />
              </div>
            ) : (
              <>
                <ModalBody>
                  <AccountStatsRow user={userInfo?.account as Account} />
                  <AccountIconsRow user={userInfo?.account as Account} />
                  <div className='grid h-[300px] grid-cols-[0.5fr,_1fr] gap-2'>
                    {/* grid grid-cols-[0.5fr,_1fr] gap-2 */}
                    <AccountInfoColumn
                      user={userInfo?.user as User}
                      canResetPw={currentUser.role == 'owner'}
                    />
                    <BodyCard cardTitle={'Datos y Permisos'}>
                      <CardSelect
                        items={ROLES}
                        label={'Nivel'}
                        selectedKeys={fields.role}
                        onChange={(e) => handleSelectionChange(e, 'role')}
                        isDisabled={currentUser.role != 'owner'}
                      />
                      <CardSelect
                        items={STATUS}
                        label={'Estado'}
                        selectedKeys={fields.status}
                        onChange={(e) => handleSelectionChange(e, 'status')}
                        isDisabled={
                          userInfo?.user.role != 'user' &&
                          currentUser.role != 'owner'
                        }
                      />
                    </BodyCard>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color='primary'
                    onPress={async (e) => {
                      setLoadingExtra(true)
                      await handleUpdate(e)
                      onClose()
                    }}
                    isDisabled={changes.length == 0}
                  >
                    Actualizar
                  </Button>
                  {(userInfo?.user.role == 'user' ||
                    currentUser.role == 'owner') && (
                    <Button
                      color='danger'
                      onClick={() => handleDelete(onClose)}
                    >
                      Eliminar
                    </Button>
                  )}
                  <Button color='danger' variant='light' onPress={onClose}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
