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
import { Accordion, AccordionItem } from "@nextui-org/react";
import { routes } from "../../../staticFiles";
import { NavLink, NavMenuLink } from "./NavbarLinks";
import { ResponsiveRankNav } from "./ResponsiveRankNav";

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

  const menuItems = [{ href: "/", label: "Home" }];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered isMenuOpen={isMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <img src="/assets/logo.png" width="36" className="mr-4" />
            <p className="font-bold text-inherit">GD Cuba ΔΔΔ</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((m) => (
            <NavLink key={m.label} href={m.href}>
              <span className="text-lg">{m.label}</span>
            </NavLink>
          ))}
          <RankDropdown />
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
          <ResponsiveRankNav onLinkSelected={() => setIsMenuOpen(false)}/>
        </NavbarMenu>
      </Navbar>
      {/* Modal Login */}
      <Login isOpen={isOpenLogin} onOpenChange={onOpenChangeLogin} />

      {/* Sign up Form */}
      <SignUp isOpen={isOpenSignUp} onOpenChange={onOpenChangeSignUp} />
    </>
  );
};
