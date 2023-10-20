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
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button color="default" variant="flat">
                  {currentUser.username ?? 'Sin cuenta'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile menu"
                disabledKeys={["profile"]}
                className="p-3"
                itemClasses={{
                  base: [
                    "rounded-md",
                    "text-default-500",
                    "transition-opacity",
                    "data-[hover=true]:text-foreground",
                    "data-[hover=true]:bg-default-100",
                    "dark:data-[hover=true]:bg-default-50",
                    "data-[selectable=true]:focus:bg-default-50",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                }}
              >
                <DropdownSection aria-label="Profile & Actions">
                  <DropdownItem
                    isReadOnly
                    key="profile"
                    className="h-14 gap-2 opacity-100"
                  >
                    <User
                      name="Invitado"
                      description="@none"
                      classNames={{
                        name: "text-default-600",
                        description: "text-default-500",
                      }}
                      avatarProps={{
                        size: "sm",
                        src: "/assets/gd_icon.svg",
                      }}
                    />
                  </DropdownItem>
                  {/* <LoginModal/> */}
                  
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}