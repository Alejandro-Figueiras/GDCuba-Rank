'use client'

import { HeroUIProvider } from '@heroui/react'
import GlobalContextProvider from './context/GlobalContext'
import ModalProvider from './context/ModalContext'
import { type ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <GlobalContextProvider>
      <ModalProvider>
        <HeroUIProvider>{children}</HeroUIProvider>
      </ModalProvider>
    </GlobalContextProvider>
  )
}
