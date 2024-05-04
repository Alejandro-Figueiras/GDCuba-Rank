export const dynamic = 'force-dynamic'

import { Flip, ToastContainer } from 'react-toastify'
import { Providers } from './Providers'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { Inter } from 'next/font/google'
import { updateAccounts } from '@/database/db.gdaccounts'
import { type ReactNode } from 'react'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata = {
  title: 'GD Cuba ΔΔΔ',
  description: 'Comunidad Cubana de Geometry Dash',
  author: 'Alejandro Figueiras',
  category: 'gaming',
  keywords: ['gdcuba', 'geometrydash', 'cuba', 'gd', 'ranking'],
  openGraph: {
    title: 'GD Cuba ΔΔΔ',
    description: 'Comunidad Cubana de Geometry Dash',
    url: 'https://gdcuba.vercel.app/',
    siteName: 'GD Cuba ΔΔΔ',
    images: [
      {
        url: 'https://gdcuba.vercel.app/og-card.jpg', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'GD Cuba ΔΔΔ'
      }
    ],
    locale: 'es_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GD Cuba ΔΔΔ',
    description: 'Comunidad Cubana de Geometry Dash',
    creator: '@AleFigueiras_',
    images: ['https://gdcuba.vercel.app/og-card.jpg'] // Must be an absolute URL
  }
}

const GlobalLayout = async ({ children }: { children: ReactNode }) => {
  updateAccounts({ limit: 5 }) // <- Actualiza los datos de la db
  return (
    <html lang='es'>
      <body className={inter.className}>
        <Providers>
          {children}
          <ToastContainer transition={Flip} />
        </Providers>
      </body>
    </html>
  )
}

export default GlobalLayout
