'use client'

import GlobalContextProvider from './context/GlobalContext'
import ModalProvider from './context/ModalContext'
import { type ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <GlobalContextProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </GlobalContextProvider>
  )
}
