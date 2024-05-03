'use client'

import React, { createContext, useEffect, useRef, useState } from 'react'
import { authMe } from '@/actions/auth/me'

export const GlobalContext = createContext({})

export default function GlobalContextProvider({
  children
}: {
  children: React.JSX.Element[]
}) {
  const [currentUser, setCurrentUser] = useState({
    username: undefined,
    accountid: undefined,
    phone: undefined,
    role: undefined
  })
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
