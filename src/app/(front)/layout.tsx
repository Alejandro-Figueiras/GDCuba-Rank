import FrontNavbar from '@/components/Navbar/FrontNavbar'
import { type ReactNode } from 'react'

const FrontLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <FrontNavbar />
      {children}
    </>
  )
}

export default FrontLayout
