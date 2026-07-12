import { ModalContext } from '@/app/context/ModalContext'
import {
  Avatar,
  Dropdown,
  useOverlayState,
  Button,
  Header
} from '@heroui/react'
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
  onOpenLogin?: () => void
  onOpenChangeSignUp?: () => void
  onOpenChangePassword?: () => void
  logout?: () => void
}) => {
  const ruta = usePathname()
  const admin = ruta.startsWith('/admin')
  const { openModal } = useContext(ModalContext)

  const logged = currentUser.username != undefined
  const handleLogout = async () => {
    await logoutAction()
    notify('Sesión cerrada.', 'success')
    if (logout) logout()
  }

  // Icon
  const { icon: iconAvatar } = useGDIcon({
    type: 'cube',
    username: currentUser.username
  })

  // Submit Record
  const { isOpen: isOpenSubmitRecord, setOpen: setChangeSubmitRecordOpen } =
    useOverlayState()

  // #region Items
  const items = []

  if (!logged) {
    items.push(
      <Dropdown.Item key='login-btn' onPress={onOpenLogin}>
        Iniciar Sesión
      </Dropdown.Item>,
      <Dropdown.Item key='signup-btn' onPress={onOpenChangeSignUp}>
        Registrarse
      </Dropdown.Item>
    )
  } else {
    items.push(
      <Dropdown.Item
        key='me-account-btn'
        href={`/account/${currentUser.username}`}
      >
        Mi cuenta
      </Dropdown.Item>,
      <Dropdown.Item
        key='new-record-btn'
        onClick={() => {
          setChangeSubmitRecordOpen(true)
        }}
      >
        Nuevo Record
      </Dropdown.Item>,
      <Dropdown.Item key='changePass-btn' onPress={onOpenChangePassword}>
        Cambiar contraseña
      </Dropdown.Item>
    )
  }

  // Admin Link
  if (!admin && logged && ['admin', 'owner'].includes(currentUser.role ?? '')) {
    items.push(
      <Dropdown.Item key='admin-link' href='/admin'>
        Admin Dashboard
      </Dropdown.Item>
    )
  }

  // Only admin path
  if (admin) {
    items.push(
      <Dropdown.Item key='admin-return-link' href='/'>
        Volver al Inicio
      </Dropdown.Item>
    )
  }

  // Exclude Admin Path
  if (logged && !admin) {
    items.push(
      <Dropdown.Item
        className='text-danger'
        // TODO color='danger'
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
      </Dropdown.Item>
    )
  }
  //#endregion Items

  //#region Dropdown
  return (
    <>
      <Dropdown
      // classNames={{
      //   base: 'before:bg-default-200', // change arrow background
      //   content: 'py-1 px-1 border border-default-200 bg-background/90'
      // }}
      >
        <Dropdown.Trigger>
          <Button
            // color='default'
            variant='tertiary'
            className={`py-4 ${currentUser.username ? `user-dropdown__button` : ''}`}
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
        </Dropdown.Trigger>

        <Dropdown.Popover
          placement='bottom end'
          className='border-default-200 bg-background/90 border p-1'
        >
          <Dropdown.Menu
            aria-label='Profile menu'
            disabledKeys={['profile']}
            className='p-3'
            // itemClasses={{
            //   base: [
            //     'rounded-md',
            //     'transition-opacity',
            //     'data-[hover=true]:text-foreground',
            //     'data-[hover=true]:bg-[#FFFFFF22]',
            //     'dark:data-[hover=true]:bg-[#FFFFFF33]',
            //     'data-[selectable=true]:focus:bg-[#FFFFFF33]',
            //     'data-[pressed=true]:opacity-70',
            //     'data-[focus-visible=true]:ring-default-500'
            //   ]
            // }}
          >
            <Dropdown.Section aria-label='User'>
              <Header>
                <div className='text-foreground inline-flex items-center gap-2 font-light'>
                  <Avatar className='rounded-none'>
                    <Avatar.Image src={iconAvatar} className='rounded-none' />
                  </Avatar>
                  <div className='flex flex-col items-start'>
                    <span className='text-sm'>
                      {currentUser.username == undefined
                        ? 'Invitado'
                        : currentUser.username}
                    </span>
                    <span className='text-muted text-xs'>
                      {currentUser.username == undefined
                        ? 'none'
                        : currentUser.phone}
                    </span>
                  </div>
                </div>
              </Header>
              {items}
            </Dropdown.Section>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
      {/* TODO fix modal */}
      {/* <SubmitRecordModal
        isOpen={isOpenSubmitRecord}
        onOpenChange={setChangeSubmitRecordOpen}
      /> */}
    </>
  )
  //#endregion
}

export default UserDropdown
