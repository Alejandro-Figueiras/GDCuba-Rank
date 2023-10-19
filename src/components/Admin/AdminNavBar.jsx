"use client"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

export default () => {
  return (
    <>
      <Navbar maxWidth="2xl">
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarItem>
            <p className="font-bold text-inherit text-xl pr-4">GD Cuba ΔΔΔ: Admin Dashboard</p>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="/" className="hidden lg:flex" color="foreground">Salir</Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}