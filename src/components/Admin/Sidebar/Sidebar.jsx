import { useSidebarContext } from '@/app/admin/layout-context'
import { Sidebar } from './sidebar.styles'
import { SidebarMenu } from './SidebarMenu'
import { SidebarItem } from './SidebarItem'
import HomeIcon from '@/components/Icons/HomeIcon'
import AccountsIcon from '@/components/Icons/AccountsIcon'
import ReportsIcon from '@/components/Icons/ReportsIcon'
import SettingsIcon from '@/components/Icons/SettingsIcon'
import ChangelogIcon from '@/components/Icons/ChangelogIcon'
import { usePathname } from 'next/navigation'
import DatabaseIcon from '@/components/Icons/DatabaseIcon'
import NewIcon from '@/components/Icons/NewIcon'
import TestTubeIcon from '@/components/Icons/TestTubeIcon'
import CheckIcon from '@/components/Icons/CheckIcon'
import LevelSliderIcon from '@/components/Icons/LevelSliderIcon'

const SidebarMain = () => {
  const { collapsed, setCollapsed } = useSidebarContext()
  const ruta = usePathname()
  return (
    <aside className='sticky top-0 z-[202] h-screen'>
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed
        })}
      >
        <div className={Sidebar.Header()}>
          <div className='flex items-center gap-2'>
            <img src='/assets/SD_256.png' alt='Logo' width='42' />
            <div className='flex flex-col gap-4'>
              <h3 className='m-0 -mb-4 whitespace-nowrap text-xl font-medium text-default-900'>
                GD Cuba ΔΔΔ
              </h3>
              <span className='text-xs font-medium text-default-500'>
                Admin Dashboard
              </span>
            </div>
          </div>
        </div>
        <div className='flex h-full flex-col justify-between'>
          <div className={Sidebar.Body()}>
            <SidebarItem
              title='Home'
              icon={<HomeIcon />}
              isActive={ruta === '/admin'}
              href='/admin'
            />
            <SidebarMenu title='Cuentas'>
              <SidebarItem
                isActive={ruta === '/admin/users'}
                title='Usuarios'
                icon={<AccountsIcon />}
                href='/admin/users'
              />
              <SidebarItem
                isActive={ruta === '/admin/accounts'}
                title='Cuentas'
                icon={<AccountsIcon />}
                href='/admin/accounts'
              />
            </SidebarMenu>
            <SidebarMenu title='Niveles'>
              <SidebarItem
                isActive={ruta === '/admin/levels/extreme'}
                title='Extreme Score'
                icon={<LevelSliderIcon />}
                href='/admin/levels/extreme'
              />
              <SidebarItem
                isActive={ruta === '/admin/records'}
                title='Records'
                icon={<CheckIcon />}
                href='/admin/records'
              />
            </SidebarMenu>
            <SidebarMenu title='General'>
              <SidebarItem
                isActive={ruta === '/admin/auditory_log'}
                title='Auditory Log'
                icon={<SettingsIcon />}
                href='/admin/auditory_log'
              />
            </SidebarMenu>
            {/* <SidebarMenu title="Testing">
                <SidebarItem
                  isActive={ruta === "/admin/testing/"}
                  title="Testing Item Example"
                  icon={<TestTubeIcon/>}
                  href="/admin/testing/"
                />
              </SidebarMenu> */}
            {/* <SidebarMenu title="Updates">
                <SidebarItem
                  isActive={ruta === "/changelog"}
                  title="Changelog"
                  icon={<ChangelogIcon />}
                  href="#"
                />
              </SidebarMenu> */}
          </div>
        </div>
      </div>
    </aside>
  )
}

/*
<CollapseItems
  // icon={<BalanceIcon />}
  items={["Banks Accounts", "Credit Cards", "Loans"]}
  title="Balances"
/>
*/

export default SidebarMain
