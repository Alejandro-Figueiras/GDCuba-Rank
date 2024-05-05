'use client'
import React, { ReactNode } from 'react'
import SidebarWrapper from '@/components/Admin/Sidebar/Sidebar'
import { useLockedBody } from './hooks/useBodyLock'
import { SidebarContext } from './layout-context'
import AdminNavBar from '@/components/Admin/NavBar/AdminNavBar'
import AdminProvider from '../context/AdminContext'

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const { setLocked } = useLockedBody(false)
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
    setLocked(!sidebarOpen)
  }

  return (
    <AdminProvider>
      <SidebarContext.Provider
        value={{
          collapsed: sidebarOpen,
          setCollapsed: handleToggleSidebar
        }}
      >
        <section className='flex'>
          <SidebarWrapper />
          <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
            <AdminNavBar />
            {children}
          </div>
        </section>
      </SidebarContext.Provider>
    </AdminProvider>
  )
}

export default AdminLayout
