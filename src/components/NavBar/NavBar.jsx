'use client'

import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/dropdown";

import {Button} from "@nextui-org/button";

export default () => {
  return (
    <Navbar isBordered maxWidth="2xl">
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <p className="font-bold text-inherit text-xl pr-4">GD Cuba ΔΔΔ</p>
        </NavbarItem>
        <NavbarItem>
          NavBar Provisional
        </NavbarItem>
      </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button color="default" variant="flat">
                  Invitado
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                
                <DropdownItem key="comming_soon">Comming Soon</DropdownItem>
                
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
    </Navbar>
  )
}