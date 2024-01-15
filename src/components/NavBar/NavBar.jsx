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
import { useSesion } from "@/hooks/useSesion";
import UserDropdown from "./UserDropdown";
import { useState } from "react";
import RankDropdown from "./RankDropdown";
import { NavLink, NavMenuLink } from "./NavbarLinks";
import { ResponsiveRankNav } from "./ResponsiveRankNav";

export default () => {
  const { currentUser, logout, signUp, login } = useSesion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [{ href: "/", label: "Home" }];

  return (
    <>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isBordered
        isMenuOpen={isMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <img src="/assets/logo.png" width="42" className="mr-3" />
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
              onOpenLogin={login}
              onOpenChangeSignUp={signUp}
            />
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((m) => (
            <NavMenuLink
              key={m.label}
              href={m.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {m.label}
            </NavMenuLink>
          ))}
          <ResponsiveRankNav onLinkSelected={() => setIsMenuOpen(false)} />
        </NavbarMenu>
      </Navbar>
    </>
  );
};
