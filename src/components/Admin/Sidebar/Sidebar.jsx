import { useSidebarContext } from "@/app/admin/layout-context";
import { Sidebar } from "./sidebar.styles"
import { SidebarMenu } from "./SidebarMenu";
import { SidebarItem } from "./SidebarItem";
import { HomeIcon } from "@/components/Icons/HomeIcon";
import AccountsIcon from "@/components/Icons/AccountsIcon";
import ReportsIcon from "@/components/Icons/ReportsIcon";
import { SettingsIcon } from "@/components/Icons/SettingsIcon";
import ChangelogIcon from "@/components/Icons/ChangelogIcon";
import { usePathname } from "next/navigation";
import DatabaseIcon from "@/components/Icons/DatabaseIcon";
import NewIcon from "@/components/Icons/NewIcon";
import TestTubeIcon from "@/components/Icons/TestTubeIcon";
import CheckIcon from "@/components/Icons/CheckIcon";
import LevelSliderIcon from "@/components/Icons/LevelSliderIcon";

export default () => {
  const { collapsed, setCollapsed } = useSidebarContext();
  const ruta = usePathname()
    return (
      <aside className="h-screen z-[202] sticky top-0">
        {collapsed ? (
          <div className={Sidebar.Overlay()} onClick={setCollapsed} />
        ) : null}
        <div
          className={Sidebar({
            collapsed: collapsed,
          })}
        >
          <div className={Sidebar.Header()}>
            
            <div className="flex items-center gap-2">
              <img src="/assets/SD_256.png" alt="Logo" width="42" />
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
                  GD Cuba ΔΔΔ
                </h3>
                <span className="text-xs font-medium text-default-500">
                  Admin Dashboard
                </span>
              </div>
            </div>

          </div>
          <div className="flex flex-col justify-between h-full">
            <div className={Sidebar.Body()}>
              <SidebarItem
                title="Home"
                icon={<HomeIcon />}
                isActive={ruta === "/admin"}
                href="/admin"
              />
              <SidebarMenu title="Cuentas">
                <SidebarItem
                  isActive={ruta === "/admin/users"}
                  title="Usuarios"
                  icon={<AccountsIcon />}
                  href="/admin/users"
                />
                <SidebarItem
                  isActive={ruta === "/admin/accounts"}
                  title="Cuentas"
                  icon={<AccountsIcon />}
                  href="/admin/accounts"
                />
              </SidebarMenu>
              <SidebarMenu title="Niveles">
                <SidebarItem
                  isActive={ruta === "/admin/levels/extreme"}
                  title="Extreme Score"
                  icon={<LevelSliderIcon/>}
                  href="/admin/levels/extreme"
                />
                <SidebarItem
                  isActive={ruta === "/admin/records"}
                  title="Records"
                  icon={<CheckIcon />}
                  href="/admin/records"
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

              {/* <SidebarMenu title="General">
                <SidebarItem
                  isActive={ruta === "/settings"}
                  title="Settings"
                  icon={<SettingsIcon />}
                  href="#"
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