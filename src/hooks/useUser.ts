import { getAccountAction } from '@/actions/accounts/getAccountAction'
import { ModalContext } from '@/app/context/ModalContext'
import { Account } from '@/models/Account'
import { useContext } from 'react'

export const useUser = () => {
  const { openUserView: openView } = useContext(ModalContext)
  const getUser = async ({ username }: { username: string }) => {
    const accountStr = await getAccountAction({ username })
    if (!accountStr) throw new Error('Error at loading Account')
    const account = JSON.parse(accountStr) as Account
    return account
  }

  const openUserView = async (user: Account, update = false) => {
    openView({ user, update })
  }

  return { getUser, openUserView }
}
