'use client'

import { NextUIProvider } from '@nextui-org/react'
import GlobalContextProvider from './context/GlobalContext'
import ModalProvider from './context/ModalContext'
import { type ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <GlobalContextProvider>
      <ModalProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </ModalProvider>
    </GlobalContextProvider>
  )
}
