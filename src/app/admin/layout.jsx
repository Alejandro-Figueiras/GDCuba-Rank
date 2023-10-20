"use client"
import React from 'react'
import SidebarWrapper from "@/components/Admin/Sidebar/Sidebar";
// import { NavbarWrapper } from "../navbar/navbar";

import { useLockedBody } from "./hooks/useBodyLock";
import { SidebarContext } from "./layout-context";
import AdminNavBar from '@/components/Admin/NavBar/AdminNavBar';

export default ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <SidebarWrapper />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <AdminNavBar admin={true}/>
          {children}

        </div>
      </section>
    </SidebarContext.Provider>
  );
};
