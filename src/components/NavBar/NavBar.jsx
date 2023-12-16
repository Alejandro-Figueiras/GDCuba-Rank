"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";

// Modals
import { useDisclosure } from "@nextui-org/modal";

import { Link } from "@nextui-org/link";
import Login from "../Forms/Login";
import SignUp from "../Forms/SignUp";

import { useSesion } from "@/hooks/useSesion";
import { usePathname } from "next/navigation";
import UserDropdown from "./UserDropdown";

const NavLink = ({href, children}) => {
  const rutaActual = usePathname()
  return (
    <NavbarItem isActive={rutaActual==href}>
      <Link href={href} color={rutaActual==href?"primary":"foreground"}>{children}</Link>
    </NavbarItem>
  )
}

export default () => {
  const {currentUser, logout} = useSesion();

  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onOpenChange: onOpenChangeLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenSignUp,
    onOpen: onOpenSignUp,
    onOpenChange: onOpenChangeSignUp,
  } = useDisclosure();

  return (
    <>
      <Navbar isBordered maxWidth="2xl">
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarItem>
            <p className="font-bold text-inherit text-xl pr-4">GD Cuba ΔΔΔ</p>
          </NavbarItem>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/rank/stars">Estrellas</NavLink>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <UserDropdown currentUser={currentUser} logout={logout} onOpenLogin={onOpenLogin} onOpenChangeSignUp={onOpenChangeSignUp}/>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Modal Login */}
      <Login isOpen={isOpenLogin} onOpenChange={onOpenChangeLogin} />

      {/* Sign up Form */}
      <SignUp isOpen={isOpenSignUp} onOpenChange={onOpenChangeSignUp} />
    </>
  );
};
