import { resetPasswordAction } from '@/actions/admin/resetPasswordAction'
import { notify } from '@/libs/toastNotifications'
import { type User } from '@/models/User'
import { Card, Button } from '@heroui/react'

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
      <Card className='mb-2' variant='secondary'>
        <Card.Content className='text-small flex flex-row justify-between'>
          <b>ID</b>
          <p>{user.accountid}</p>
        </Card.Content>
      </Card>

      <Card className='mb-2' variant='secondary'>
        <Card.Content className='text-small flex flex-row justify-between'>
          <b>Teléfono</b>
          <p>{user.phone}</p>
        </Card.Content>
      </Card>

      <Button
        className='bg-warning mb-2 w-full text-black hover:opacity-50'
        // color='warning'
        onPress={handleResetPassword}
        isDisabled={!canResetPw}
      >
        R. Contraseña
      </Button>
    </div>
  )
}

export default AccountInfoColumn
