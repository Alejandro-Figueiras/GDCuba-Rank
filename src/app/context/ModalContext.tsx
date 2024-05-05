'use client'
import { getAccountAction } from '@/actions/accounts/getAccountAction'
import { getStuffItemsAction } from '@/actions/accounts/stuffActions'
import { updateAccountAction } from '@/actions/accounts/updateAccountAction'
import ChangePasswordForm from '@/components/Forms/ChangePasswordForm'
import LoginForm from '@/components/Forms/LoginForm'
import SignUpForm from '@/components/Forms/SignUpForm'
import Modal from '@/components/Modal'
import UserModalView from '@/components/UserModalView'
import { notify } from '@/libs/toastNotifications'
import { Account } from '@/models/Account'
import { useDisclosure } from '@nextui-org/react'
import React, { createContext, type ReactNode, useState } from 'react'

export type UserInView = {
  account: Account | { username: string }
  stuff: any[] // TODO stuff fix
  isLoading?: boolean
  isStuffLoading?: boolean
}

export const ModalContext = createContext({
  openModal: ({}: {
    title: string
    desc: string
    onSubmit: () => void
    action?: string
  }) => {},
  openUserView: ({}: {
    user: Account | { username: string }
    update?: boolean
  }) => {},
  onOpenLogin: () => {},
  onOpenSignUp: () => {},
  onOpenPassword: () => {}
})

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState({
    title: undefined,
    desc: undefined,
    type: 'normal', // TODO ver esto
    onSubmit: () => {}
  } as {
    title: string | undefined
    desc: string | undefined
    onSubmit: () => void
    action?: string
  })
  const [currentUserInView, setCurrentUserInView] = useState(
    undefined as undefined | UserInView
  )
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const {
    isOpen: isOpenUserView,
    onOpen: onOpenUserView,
    onOpenChange: onOpenChangeUserView
  } = useDisclosure()
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onOpenChange: onOpenChangeLogin
  } = useDisclosure()
  const {
    isOpen: isOpenSignUp,
    onOpen: onOpenSignUp,
    onOpenChange: onOpenChangeSignUp
  } = useDisclosure()
  const {
    isOpen: isOpenPassword,
    onOpen: onOpenPassword,
    onOpenChange: onOpenChangePassword
  } = useDisclosure()

  const openModal = ({
    title,
    desc,
    onSubmit,
    action = 'none'
  }: {
    title: string
    desc: string
    onSubmit: () => void
    action?: string
  }) => {
    if (!isOpen) {
      console.log('Opening modal')
      onOpen()
      setCurrent({ title, desc, action, onSubmit })
    }
  }

  const openUserView = async ({
    user,
    update = false
  }: {
    user: Account | { username: string }
    update?: boolean
  }) => {
    const shouldLoad = (user as Account).stars == null
    setCurrentUserInView({
      account: user,
      stuff: [],
      isLoading: shouldLoad,
      isStuffLoading: user && ((user as Account).stuff ?? '') != ''
    })
    onOpenUserView()
    if (shouldLoad) {
      const accInfo = await getAccountAction({ username: user.username })
      if (!accInfo) {
        notify('Error al cargar la cuenta', 'error')
        onClose()
        return
      }
      user = JSON.parse(accInfo) as Account
    }

    if (update) {
      const updateInfo = await updateAccountAction(
        (user as Account).accountid,
        user.username
      )
      if (updateInfo) {
        const newData = JSON.parse(updateInfo)
        user = { ...user, ...newData } as Account
      }
    }
    const stuff =
      (user as Account).stuff != ''
        ? JSON.parse(
            await getStuffItemsAction({
              accountid: (user as Account).accountid
            })
          )
        : []
    setCurrentUserInView({ account: user as Account, stuff })
  }

  return (
    <ModalContext.Provider
      value={{
        openModal,
        openUserView,
        onOpenLogin,
        onOpenSignUp,
        onOpenPassword
      }}
    >
      <UserModalView
        user={currentUserInView}
        onOpenChange={onOpenChangeUserView}
        isOpen={isOpenUserView}
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={current.title}
        desc={current.desc}
        action={current.action}
        submit={current.onSubmit}
      />
      <LoginForm isOpen={isOpenLogin} onOpenChange={onOpenChangeLogin} />
      <SignUpForm isOpen={isOpenSignUp} onOpenChange={onOpenChangeSignUp} />
      <ChangePasswordForm
        isOpen={isOpenPassword}
        onOpenChange={onOpenChangePassword}
      />
      {children}
    </ModalContext.Provider>
  )
}
