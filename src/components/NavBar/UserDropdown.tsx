import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  useDisclosure
} from '@nextui-org/react'
import { ModalContext } from '@/app/context/ModalContext'

import { User } from '@nextui-org/user'
import { Button } from '@nextui-org/button'
import { useGDIcon } from '@/robtop/iconkit/useGDIcon'
import { useContext } from 'react'
import { usePathname } from 'next/navigation'
import { logout as logoutAction } from '@/actions/logout/logout'
import { notify } from '@/libs/toastNotifications'
import SubmitRecordModal from '../NewRecord/SubmitRecordModal'
import './UserDropdown.css'
import { CurrentUser } from '@/app/context/GlobalContext'

const UserDropdown = ({
  currentUser,
  onOpenLogin,
  onOpenChangeSignUp,
  onOpenChangePassword,
  logout
}: {
  currentUser: CurrentUser
  onOpenLogin: () => void
  onOpenChangeSignUp: () => void
  onOpenChangePassword: () => void
  logout: () => void
}) => {
  const ruta = usePathname()
  const admin = ruta.startsWith('/admin')
  const { openModal } = useContext(ModalContext)

  const logged = currentUser.username != undefined
  const handleLogout = async () => {
    await logoutAction()
    notify('Sesión cerrada.', 'success')
    logout()
  }

  // Icon
  const { icon: iconAvatar } = useGDIcon({
    type: 'cube',
    username: currentUser.username
  })

  // Submit Record
  const {
    isOpen: isOpenSubmitRecord,
    onOpenChange: onOpenChangeSubmitRecord,
    onOpen: onOpenSubmitRecord
  } = useDisclosure()

  // #region Items
  const items = [
    <DropdownItem
      key='profile'
      className='h-14 gap-2 opacity-100'
      textValue='User'
    >
      <User
        name={
          currentUser.username == undefined ? 'Invitado' : currentUser.username
        }
        description={
          currentUser.username == undefined ? 'none' : currentUser.phone
        }
        classNames={{
          name: 'text-default-600',
          description: 'text-default-500'
        }}
        avatarProps={{
          size: 'sm',
          radius: 'none',
          src: iconAvatar
        }}
      />
    </DropdownItem>
  ]

  if (!logged) {
    items.push(
      <DropdownItem key='login-btn' onPress={onOpenLogin}>
        Iniciar Sesión
      </DropdownItem>,
      <DropdownItem key='signup-btn' onPress={onOpenChangeSignUp}>
        Registrarse
      </DropdownItem>
    )
  } else {
    items.push(
      <DropdownItem
        key='me-account-btn'
        href={`/account/${currentUser.username}`}
      >
        Mi cuenta
      </DropdownItem>,
      <DropdownItem
        key='new-record-btn'
        onClick={() => {
          onOpenChangeSubmitRecord()
        }}
      >
        Nuevo Record
      </DropdownItem>,
      <DropdownItem key='changePass-btn' onPress={onOpenChangePassword}>
        Cambiar contraseña
      </DropdownItem>
    )
  }

  // Admin Link
  if (!admin && logged && ['admin', 'owner'].includes(currentUser.role ?? '')) {
    items.push(
      <DropdownItem key='admin-link' href='/admin'>
        Admin Dashboard
      </DropdownItem>
    )
  }

  // Only admin path
  if (admin) {
    items.push(
      <DropdownItem key='admin-return-link' href='/'>
        Volver al Inicio
      </DropdownItem>
    )
  }

  // Exclude Admin Path
  if (logged && !admin) {
    items.push(
      <DropdownItem
        className='text-danger'
        color='danger'
        key='logout-btn'
        onPress={() => {
          openModal({
            title: `Logout`,
            desc: `¿Seguro que deseas salir de la cuenta actual?`,
            action: 'action',
            onSubmit: () => handleLogout()
          })
        }}
      >
        Cerrar Sesión
      </DropdownItem>
    )
  }
  //#endregion Items

  //#region Dropdown
  return (
    <>
      <Dropdown
        placement='bottom-end'
        classNames={{
          base: 'before:bg-default-200', // change arrow background
          content: 'py-1 px-1 border border-default-200 bg-background/90'
        }}
      >
        <DropdownTrigger>
          <Button
            color='default'
            variant='flat'
            className={currentUser.username ? `user-dropdown__button` : ''}
          >
            {currentUser.username && (
              <>
                <img
                  src={iconAvatar}
                  alt={currentUser.username}
                  className='h-7'
                />
                <span className='user-dropdown__username'>
                  {currentUser.username}
                </span>
              </>
            )}
            <span className='user-dropdown__sin-cuenta'>
              {!currentUser.username && 'Sin cuenta'}
            </span>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Profile menu'
          disabledKeys={['profile']}
          className='p-3'
          itemClasses={{
            base: [
              'rounded-md',
              'transition-opacity',
              'data-[hover=true]:text-foreground',
              'data-[hover=true]:bg-[#FFFFFF22]',
              'dark:data-[hover=true]:bg-[#FFFFFF33]',
              'data-[selectable=true]:focus:bg-[#FFFFFF33]',
              'data-[pressed=true]:opacity-70',
              'data-[focus-visible=true]:ring-default-500'
            ]
          }}
        >
          <DropdownSection aria-label='User'>{items}</DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <SubmitRecordModal
        isOpen={isOpenSubmitRecord}
        onOpenChange={onOpenChangeSubmitRecord}
      />
    </>
  )
  //#endregion
}

export default UserDropdown
