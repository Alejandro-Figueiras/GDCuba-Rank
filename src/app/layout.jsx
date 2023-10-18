export const dynamic = 'force-dynamic'

import { Flip, ToastContainer } from 'react-toastify'
import { Providers } from './Providers'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css';


import { Inter } from 'next/font/google'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 

export const metadata = {
  title: 'GD Cuba ΔΔΔ',
  description: 'Una página web y ranking para la comunidad cubana de Geometry Dash',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
          <ToastContainer transition={Flip}/>
        </Providers>
      </body>
    </html>
  )
}
