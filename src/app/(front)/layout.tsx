import FrontNavbar from '@/components/FrontNavbar/FrontNavbar'
import { type ReactNode } from 'react'

const FrontLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <FrontNavbar />
      <div className='pt-16'>{children}</div>
    </>
  )
}

export default FrontLayout
