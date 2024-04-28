'use client'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu
} from '@nextui-org/navbar'

// Modals
import { useSesion } from '@/hooks/useSesion'
import UserDropdown from './UserDropdown'
import { useState } from 'react'
import { NavLink, NavMenuLink } from './NavbarLinks'
import NavbarDropdown from './NavbarDropdown'
import { ResponsiveNavAccordion } from './ResponsiveNavAccordion'
import './NavBar.css'

const NavBar = () => {
  const { currentUser, logout, signUp, login, changePassword } = useSesion()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [{ href: '/', label: 'Home' }]
  const rankItems = {
    title: 'Rankings',
    responsiveSubtitle: 'Presiona para ver los ranking disponibles',
    startsWith: '/rank',
    items: [
      {
        key: 'estrellas',
        img: '/assets/stats/starsIcon.png',
        href: '/rank/stars',
        label: 'Estrellas'
      },
      {
        key: 'demons',
        img: '/assets/dificultades/none/hard_demon.png',
        href: '/rank/demons',
        label: 'Demons'
      },
      {
        key: 'extremes',
        img: '/assets/dificultades/none/extreme_demon.png',
        href: '/rank/extremes',
        label: 'Extreme Demons'
      },
      {
        key: 'lunas',
        img: '/assets/stats/moonsIcon.png',
        href: '/rank/moons',
        label: 'Lunas'
      },
      {
        key: 'usercoins',
        img: '/assets/stats/usercoin.png',
        href: '/rank/usercoins',
        label: 'User Coins'
      },
      {
        key: 'cps',
        img: '/assets/stats/creatorpoints.png',
        href: '/rank/cp',
        label: 'Creator Points'
      }
    ]
  }
  const listsItems = {
    title: 'Listas',
    responsiveSubtitle: 'Presiona para ver las listas',
    startsWith: '/lists',
    items: [
      {
        key: 'hardest-trad',
        img: '/assets/ui/extreme_demon_trad.png',
        href: '/lists/hardest/trad',
        label: 'Hardest Tradicional'
      },
      {
        key: 'hardest-plat',
        img: '/assets/ui/extreme_demon_plat.png',
        href: '/lists/hardest/plat',
        label: 'Hardest Plataforma'
      },
      {
        key: 'insane',
        img: '/assets/dificultades/none/insane_demon.png',
        href: '/lists/insane',
        label: 'Insane Demons'
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
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='md:hidden'
          />
          <NavbarBrand>
            <img
              src='/assets/SD_256.png'
              className={`navbar__logo mr-2 sm:mr-3 ${currentUser.username ? '' : 'no-acc'}`}
              alt=''
            />
            <p
              className={`navbar__brand text-xl font-bold ${currentUser.username ? '' : 'no-acc'}`}
            >
              GD Cuba ΔΔΔ
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden gap-4 md:flex' justify='center'>
          {menuItems.map((m) => (
            <NavLink key={m.label} href={m.href}>
              <span className='text-lg'>{m.label}</span>
            </NavLink>
          ))}
          <NavbarDropdown info={rankItems} />
          <NavbarDropdown info={listsItems} />
        </NavbarContent>
        <NavbarContent justify='end'>
          <NavbarItem>
            <UserDropdown
              currentUser={currentUser}
              logout={logout}
              onOpenLogin={login}
              onOpenChangeSignUp={signUp}
              onOpenChangePassword={changePassword}
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
          <ResponsiveNavAccordion
            onLinkSelected={() => setIsMenuOpen(false)}
            info={rankItems}
          />
          <ResponsiveNavAccordion
            onLinkSelected={() => setIsMenuOpen(false)}
            info={listsItems}
          />
        </NavbarMenu>
      </Navbar>
    </>
  )
}

export default NavBar
