"use client"
import React from 'react'
import SidebarWrapper from "@/components/Admin/Sidebar/Sidebar";
// import { NavbarWrapper } from "../navbar/navbar";

import { useLockedBody } from "./hooks/useBodyLock";
import { SidebarContext } from "./layout-context";

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
        {/* <NavbarWrapper>{children}</NavbarWrapper> */}
        {children}
      </section>
    </SidebarContext.Provider>
  );
};
