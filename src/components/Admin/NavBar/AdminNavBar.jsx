"use client";
import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";

import { User } from "@nextui-org/user";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { GlobalContext } from "@/app/context/GlobalContext";
import { BurguerButton } from "./BurgerButton";
import UserDropdown from "@/components/NavBar/UserDropdown";

export default () => {
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