"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/navbar";

// Modals
import { useSesion } from "@/hooks/useSesion";
import UserDropdown from "./UserDropdown";
import { useState } from "react";
import { NavLink, NavMenuLink } from "./NavbarLinks";
import NavbarDropdown from "./NavbarDropdown";
import { ResponsiveNavAccordion } from "./ResponsiveNavAccordion";
import './NavBar.css'

export default () => {
  const { currentUser, logout, signUp, login } = useSesion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [{ href: "/", label: "Home" }];
  const rankItems = {
    title: "Rankings",
    responsiveSubtitle: "Presiona para ver los ranking disponibles",
    startsWith: '/rank',
    items: [
      {
        key: "estrellas",
        img: '/assets/stats/starsIcon.png',
        href: "/rank/stars",
        label: "Estrellas"
      },
      {
        key: "demons",
        img: '/assets/dificultades/none/hard_demon.png',
        href: "/rank/demons",
        label: "Demons"
      },
      {
        key: "extremes",
        img: '/assets/dificultades/none/extreme_demon.png',
        href: "/rank/extremes",
        label: "Extreme Demons"
      },
      {
        key: "lunas",
        img: '/assets/stats/moonsIcon.png',
        href: "/rank/moons",
        label: "Lunas"
      },
      {
        key: "usercoins",
        img: '/assets/stats/usercoin.png',
        href: "/rank/usercoins",
        label: "User Coins"
      },
      {
        key: "cps",
        img: '/assets/stats/creatorpoints.png',
        href: "/rank/cp",
        label: "Creator Points"
      }
    ]
  }
  const listsItems = {
    title: "Listas",
    responsiveSubtitle: "Presiona para ver las listas",
    startsWith: '/lists',
    items: [
      {
        key: "hardest",
        img: '/assets/dificultades/none/extreme_demon.png',
        href: "/lists/hardest",
        label: "Hardest"
      },
      {
        key: "insane",
        img: '/assets/dificultades/none/insane_demon.png',
        href: "/lists/insane",
        label: "Insane Demons"
      }
    ]
  }

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
            className="md:hidden"
          />
          <NavbarBrand>
            <img src="/assets/logo.png" className="mr-2 sm:mr-3 navbar__logo" />
            <p className="font-bold text-xl navbar__brand">GD Cuba ΔΔΔ</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-4" justify="center">
          {menuItems.map((m) => (
            <NavLink key={m.label} href={m.href}>
              <span className="text-lg">{m.label}</span>
            </NavLink>
          ))}
          <NavbarDropdown info={rankItems}/>
          <NavbarDropdown info={listsItems}/>
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
          <ResponsiveNavAccordion onLinkSelected={() => setIsMenuOpen(false)} info={rankItems} />
          <ResponsiveNavAccordion onLinkSelected={() => setIsMenuOpen(false)} info={listsItems} />
        </NavbarMenu>
      </Navbar>
    </>
  );
};
