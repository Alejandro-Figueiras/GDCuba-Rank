import { GlobalContext } from '@/app/context/GlobalContext'
import { ModalContext } from '@/app/context/ModalContext'
import { useContext } from 'react'

export const useSesion = () => {
  const { currentUser, setCurrentUser } = useContext(GlobalContext)
  const { setOpenLogin, setOpenSignUp, setOpenPassword } =
    useContext(ModalContext)

  const logout = () => {
    setCurrentUser({
      username: undefined,
      accountid: undefined,
      phone: undefined,
      role: undefined
    })
  }

  const signUp = () => {
    setOpenSignUp(true)
  }

  const login = () => {
    setOpenLogin(true)
  }

  const changePassword = () => {
    setOpenPassword(true)
  }

  return { currentUser, logout, signUp, login, changePassword }
}
