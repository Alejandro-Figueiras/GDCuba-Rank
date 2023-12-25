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
import { useState } from "react";
import RankDropdown from "./RankDropdown";

const NavLink = ({ href, children }) => {
  const rutaActual = usePathname();

  return (
    <NavbarItem isActive={rutaActual == href}>
      <Link href={href} color={rutaActual == href ? "primary" : "foreground"}>
        {children}
      </Link>
    </NavbarItem>
  );
};

const NavMenuLink = ({ href, children }) => {
  const rutaActual = usePathname();

  return (
    <NavbarMenuItem isActive={rutaActual == href}>
      <Link
        href={href}
        color={rutaActual == href ? "primary" : "foreground"}
        className="w-full"
      >
        {children}
      </Link>
    </NavbarMenuItem>
  );
};

export default () => {
  const { currentUser, logout } = useSesion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const menuItems = [
    { href: "/", label: "Home" }
  ];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            {/* <GDQBA LOGO /> */}
            <p className="font-bold text-inherit">GD Cuba ΔΔΔ</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((m) => (
            <NavLink key={m.label} href={m.href}>
              <span className='text-lg'>{m.label}</span>
            </NavLink>
          ))}
          <RankDropdown/>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <UserDropdown
              currentUser={currentUser}
              logout={logout}
              onOpenLogin={onOpenLogin}
              onOpenChangeSignUp={onOpenChangeSignUp}
            />
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((m) => (
            <NavMenuLink key={m.label} href={m.href}>
              {m.label}
            </NavMenuLink>
          ))}
        </NavbarMenu>
      </Navbar>
      {/* Modal Login */}
      <Login isOpen={isOpenLogin} onOpenChange={onOpenChangeLogin} />

      {/* Sign up Form */}
      <SignUp isOpen={isOpenSignUp} onOpenChange={onOpenChangeSignUp} />
    </>
  );
};
