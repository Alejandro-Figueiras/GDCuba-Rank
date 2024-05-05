import FrontNavbar from '@/components/FrontNavbar/FrontNavbar'
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
