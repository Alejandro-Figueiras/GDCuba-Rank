import { resetPasswordAction } from '@/actions/admin/resetPasswordAction'
import { notify } from '@/libs/toastNotifications'
import { type User } from '@/models/User'
import { Card, CardHeader, Button } from '@heroui/react'

const AccountInfoColumn = ({
  user,
  canResetPw = false
}: {
  user: User
  canResetPw?: boolean
}) => {
  const handleResetPassword = () => {
    resetPasswordAction({ username: user.username }).then((result) => {
      if (result == 1) {
        notify(`La nueva contraseña de ${user.username} es 1234`, 'success')
      } else {
        notify('Error al cambiar la contraseña', 'error')
      }
    })
  }

  return (
    <div>
      <Card classNames={{ base: 'mb-2' }}>
        <CardHeader className='text-small justify-between'>
          <b>ID</b>
          <p>{user.accountid}</p>
        </CardHeader>
      </Card>

      <Card classNames={{ base: 'mb-2' }}>
        <CardHeader className='text-small justify-between'>
          <b>Teléfono</b>
          <p>{user.phone}</p>
        </CardHeader>
      </Card>

      <Button
        className='mb-2 w-full'
        color='warning'
        onPress={handleResetPassword}
        isDisabled={!canResetPw}
      >
        R. Contraseña
      </Button>
    </div>
  )
}

export default AccountInfoColumn
