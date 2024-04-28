'use client'

import React, { createContext, useEffect, useRef, useState } from 'react'
import { notify, notifyDismiss } from '@/libs/toastNotifications'
import { authMe } from '@/actions/auth/me'

export const GlobalContext = createContext()

export default function GlobalContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    username: undefined,
    accountid: undefined,
    phone: undefined,
    role: undefined
  })
  const [appliactionLoading, setAppliactionLoading] = useState({ toast: null })
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

  const setGlobaLoading = (loading) => {
    if (loading && !appliactionLoading.toast) {
      const loading = notify('Cargando, espera un momento', 'loading')
      setAppliactionLoading({ toast: loading })
    }
    if (!loading) {
      notifyDismiss(appliactionLoading.toast)
      setAppliactionLoading({ toast: null })
    }
  }

  return (
    <GlobalContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </GlobalContext.Provider>
  )
}
