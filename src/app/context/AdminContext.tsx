import UserModalPanel from '@/components/Admin/UserModalPanel/UserModalPanel'
import { useDisclosure } from '@nextui-org/react'
import React, { createContext, type ReactNode, useState } from 'react'
import { notify } from '@/libs/toastNotifications'
import { responseText } from '@/locales/siteText'
import { getAccountAction } from '@/actions/accounts/getAccountAction'
import { type Account } from '@/models/Account'
import { type User } from '@/models/User'

export interface UserInCheck {
  account?: Account
  user: User
  updateData?: () => void
}

export const AdminContext = createContext({
  userInCheck: undefined,
  setUserInCheck: () => {},
  openUserGestorFor: () => {}
} as {
  userInCheck: UserInCheck | undefined
  setUserInCheck: (val: UserInCheck) => void
  openUserGestorFor: (user: User, updateData: () => void) => void
})

export default function AdminProvider({ children }: { children: ReactNode }) {
  const [userInCheck, setUserInCheck] = useState(
    undefined as UserInCheck | undefined
  )
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [loadingUser, setLoadingUser] = useState(false)

  const openUserGestorFor = async (user: User, updateData: () => void) => {
    setUserInCheck({ user })
    onOpen()
    setLoadingUser(true)

    const accountInfo = await getAccountAction({ username: user.username })
    if (accountInfo) {
      const account = JSON.parse(accountInfo) as Account
      setUserInCheck({
        account,
        user,
        updateData: updateData
      })
    } else {
      onClose()
      notify(responseText.error, 'error')
    }
    setLoadingUser(false)
  }

  return (
    <AdminContext.Provider
      value={{ userInCheck, setUserInCheck, openUserGestorFor }}
    >
      <UserModalPanel
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        userInfo={userInCheck}
        isLoading={loadingUser}
      />
      {children}
    </AdminContext.Provider>
  )
}
