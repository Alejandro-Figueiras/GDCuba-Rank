"use client";
import React, { useContext } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

import { GlobalContext } from "@/app/context/GlobalContext";
import { BurguerButton } from "./BurgerButton";
import UserDropdown from "@/components/NavBar/UserDropdown";

const AdminNavBar = () => {
  const {currentUser} = useContext(GlobalContext);
  return (
    <>
      <Navbar isBordered maxWidth="2xl">
        {/* Sidebar Trigger Button */}
        <NavbarContent className="md:hidden"><BurguerButton /></NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="start">
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>

            <UserDropdown currentUser={currentUser}/>

          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}

export default AdminNavBar