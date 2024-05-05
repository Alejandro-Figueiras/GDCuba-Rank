'use client'

import React, {
  createContext,
  type ReactNode,
  useEffect,
  useRef,
  useState
} from 'react'
import { authMe } from '@/actions/auth/me'

export type CurrentUser = {
  username: string | undefined
  accountid: number | undefined
  phone: string | undefined
  role: string | undefined
}

export const GlobalContext = createContext({
  currentUser: {
    username: undefined,
    accountid: undefined,
    phone: undefined,
    role: undefined
  } as CurrentUser,
  setCurrentUser: (() => {}) as (val: CurrentUser) => void
})

export default function GlobalContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [currentUser, setCurrentUser] = useState({
    username: undefined,
    accountid: undefined,
    phone: undefined,
    role: undefined
  } as CurrentUser)
  const firstAssembly = useRef(false)

  useEffect(() => {
    async function auth() {
      if (firstAssembly.current) return
      const data = JSON.parse(await authMe())
      console.log(data)
      if (!data.error) {
        if (data) setCurrentUser(data)
      }
    }

    auth()
    firstAssembly.current = true
  }, [])

  return (
    <GlobalContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </GlobalContext.Provider>
  )
}
