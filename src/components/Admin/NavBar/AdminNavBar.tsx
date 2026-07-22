'use client'
import React, { useContext } from 'react'

import { GlobalContext } from '@/app/context/GlobalContext'
import { BurguerButton } from './BurgerButton'
import UserDropdown from '@/components/FrontNavbar/UserDropdown'

const AdminNavBar = () => {
  const { currentUser } = useContext(GlobalContext)
  return (
    <>
      <nav className='border-separator bg-background/70 sticky top-0 z-40 w-full border-b backdrop-blur-lg'>
        <header className='mx-auto flex h-16 w-full max-w-384 items-center justify-between px-4 sm:px-6'>
          {/* Sidebar Trigger Button */}
          <div className='flex items-center md:hidden'>
            <BurguerButton />
          </div>

          <div className='hidden items-center gap-4 sm:flex'></div>

          <div className='flex items-center justify-end'>
            <UserDropdown currentUser={currentUser} />
          </div>
        </header>
      </nav>
    </>
  )
}

export default AdminNavBar
