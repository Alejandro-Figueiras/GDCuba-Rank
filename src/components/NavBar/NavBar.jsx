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
  const rankItems = {
    title: "Rankings",
    responsiveSubtitle: "Presiona para ver los ranking disponibles",
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
          <RankDropdown info={rankItems}/>
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
          <ResponsiveRankNav onLinkSelected={() => setIsMenuOpen(false)} info={rankItems} />
        </NavbarMenu>
      </Navbar>
    </>
  );
};
