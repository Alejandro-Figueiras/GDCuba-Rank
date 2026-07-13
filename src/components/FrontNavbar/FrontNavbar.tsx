'use client'

// Modals
import { useSesion } from '@/hooks/useSesion'
import UserDropdown from './UserDropdown'
import { useState } from 'react'
import { NavLink } from './NavbarLinks'
import NavbarDropdown from './NavbarDropdown'
import { ResponsiveNavAccordion } from './ResponsiveNavAccordion'
import './FrontNavbar.css'
import type FrontNavbarItem from './FrontNavbarItem'
import { Link } from '@heroui/react'
import { usePathname } from 'next/navigation'

const FrontNavbar = () => {
  const { currentUser, logout, signUp, login, changePassword } = useSesion()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const rutaActual = usePathname()

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
    ] as FrontNavbarItem[]
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
    ] as FrontNavbarItem[]
  }

  return (
    <>
      <nav
        className={`border-separator bg-background/70 fixed top-0 z-40 flex w-full flex-col border-b backdrop-blur-xl transition-all ${isMenuOpen && 'h-screen'}`}
      >
        <header className='container mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6'>
          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className='text-foreground inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden'
            >
              <span className='sr-only'>
                {isMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              <svg
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
            <div className='flex items-center'>
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
            </div>
          </div>

          <ul className='hidden items-center justify-center gap-4 md:flex'>
            {menuItems.map((m) => (
              <NavLink key={m.label} href={m.href}>
                <span className='text-lg'>{m.label}</span>
              </NavLink>
            ))}
            <NavbarDropdown info={rankItems} />
            <NavbarDropdown info={listsItems} />
          </ul>
          <div className='flex items-center justify-end'>
            <UserDropdown
              currentUser={currentUser}
              logout={logout}
              onOpenLogin={login}
              onOpenChangeSignUp={signUp}
              onOpenChangePassword={changePassword}
            />
          </div>
        </header>
        {isMenuOpen && (
          <div className='border-separator grow overflow-y-scroll border-t md:hidden'>
            <ul className='flex flex-col gap-2 p-4'>
              {menuItems.map((m) => (
                <Link
                  className={`${rutaActual == m.href ? 'font-bold' : ''} px-4 text-lg`}
                  aria-current={rutaActual == m.href ? 'page' : undefined}
                  key={m.label}
                  href={m.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {m.label}
                </Link>
              ))}
              <ResponsiveNavAccordion
                onLinkSelected={() => setIsMenuOpen(false)}
                info={rankItems}
              />
              <ResponsiveNavAccordion
                onLinkSelected={() => setIsMenuOpen(false)}
                info={listsItems}
              />
            </ul>
          </div>
        )}
      </nav>
    </>
  )
}
// TODO movil

export default FrontNavbar
