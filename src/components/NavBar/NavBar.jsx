"use client";
import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";

import { User } from "@nextui-org/user";
import { Button } from "@nextui-org/button";

// Modals
import { useDisclosure } from "@nextui-org/modal";

import { Link } from "@nextui-org/link";
import Login from "../Forms/Login";
import SignUp from "../Forms/SignUp";
import { GlobalContext } from "@/app/context/GlobalContext";
import { apiRequest } from "@/libs/serverRequest";
import config from "../../../config";
import { notify, notifyDismiss } from "@/libs/toastNotifications";
import { operationText } from "@/locales/siteText";
import { ModalContext } from "@/app/context/ModalContext";
import { useSesion } from "@/hooks/useSesion";
import { useGDIcon } from "@/robtop/iconkit/useGDIcon";
import { usePathname } from "next/navigation";

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
  const { openModal } = useContext(ModalContext);

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

  const handleLogout = async () => {
    const apiResult = await apiRequest(config.apiURL + "logout");
    if (apiResult.isError()) {
      return notify(operationText.error, "error");
    }
    logout();
  };

  // Icon
  const {icon: iconAvatar} = useGDIcon({
    type: 'cube',
    username: currentUser.username,
    effectDeps: [currentUser.username]
  })

  const logged = currentUser.username != undefined

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
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button color="default" variant="flat">
                  {currentUser.username && (<img src={iconAvatar} alt={currentUser.username} className="h-7"/>)}
                  {currentUser.username ?? "Sin cuenta"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile menu"
                disabledKeys={["profile"]}
                className="p-3"
                itemClasses={{
                  base: [
                    "rounded-md",
                    "text-default-500",
                    "transition-opacity",
                    "data-[hover=true]:text-foreground",
                    "data-[hover=true]:bg-default-100",
                    "dark:data-[hover=true]:bg-default-50",
                    "data-[selectable=true]:focus:bg-default-50",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                }}
              >
                <DropdownSection aria-label="Profile & Actions">
                  <DropdownItem
                    isReadOnly
                    key="profile"
                    className="h-14 gap-2 opacity-100"
                    textValue="User"
                  >
                    <User
                      name={currentUser.username == undefined ? "Invitado" : currentUser.username}
                      description={currentUser.username == undefined ? "none" : currentUser.phone}
                      classNames={{
                        name: "text-default-600",
                        description: "text-default-500",
                      }}
                      avatarProps={{
                        size: "sm",
                        radius: 'none',
                        src: iconAvatar,
                      }}
                    />
                  </DropdownItem>
                  {
                    !logged && (
                      <DropdownItem key="login-btn" onPress={onOpenLogin}>
                        Iniciar Sesión
                      </DropdownItem>
                    ) 
                  }
                  {
                    // Esta doble porque da un error con nextui
                    !logged && (
                      <DropdownItem key="signup-btn" onPress={onOpenChangeSignUp}>
                        Registrarse
                      </DropdownItem>
                    )
                  }
                  {
                    // Admin Link
                    (logged && currentUser.role == 'admin') && (
                      <DropdownItem key="admin-link" href='/admin'>
                        Admin Dashboard
                      </DropdownItem>  
                    )
                  }
                  {logged && (
                    <DropdownItem
                      key="logout-btn"
                      onPress={() => {
                        openModal({
                          title: `Logout`,
                          desc: `¿Seguro que deseas salir de la cuenta actual?`,
                          action: "action",
                          onSubmit: () => handleLogout(),
                        });
                      }}
                    >
                      Cerrar Sesión
                    </DropdownItem>
                  )}
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
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
