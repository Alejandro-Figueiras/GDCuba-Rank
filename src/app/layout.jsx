export const dynamic = 'force-dynamic'

import { Flip, ToastContainer } from 'react-toastify'
import { dbExists, dbInit } from '@/database/db.init';
import { Providers } from './Providers'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css';

import { Inter } from 'next/font/google'
import { updateAccounts } from '@/database/cloud/db.functions';
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
}) 

export const metadata = {
  title: 'GD Cuba ΔΔΔ',
  description: 'Una página web y ranking para la comunidad cubana de Geometry Dash',
}

export default async({ children }) => {
  await updateAccounts({limit: 1}); // <- Actualiza los datos de la db
  let serverError = ""
  try {
    if (!dbExists()) await dbInit();
  } catch (e) {
    console.log(e)
    serverError = "ERROR 500"
  }
  return (
    <html lang="es">
      <body className={inter.className}>
        {(serverError)?(<p>{serverError}</p>)
        : (
          <Providers>
            {children}
            <ToastContainer transition={Flip}/>
          </Providers>
        )}
      </body>
    </html>
  )
}
