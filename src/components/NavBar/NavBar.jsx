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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import Login from "../Forms/Login";
import SignUp from "../Forms/SignUp";
import { GlobalContext } from "@/app/context/GlobalContext";
import { apiRequest } from "@/libs/serverRequest";
import config from "../../../config";
import { notify, notifyDismiss } from "@/libs/toastNotifications";
import { operationText } from "@/locales/siteText";

export default () => {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);

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
    const loading = notify(operationText.quit, "loading");
    const apiResult = await apiRequest(config.apiURL + "logout");
    notifyDismiss(loading);
    if (apiResult.isError()) {
      return notify(operationText.error, "error");
    }
    setCurrentUser({
      username: undefined,
      accountID: undefined,
    });
  };

  return (
    <>
      <Navbar isBordered maxWidth="2xl">
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarItem>
            <p className="font-bold text-inherit text-xl pr-4">GD Cuba ΔΔΔ</p>
          </NavbarItem>
          <NavbarItem>NavBar Provisional</NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button color="default" variant="flat">
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
                  >
                    <User
                      name="Invitado"
                      description="@none"
                      classNames={{
                        name: "text-default-600",
                        description: "text-default-500",
                      }}
                      avatarProps={{
                        size: "sm",
                        src: "/assets/gd_icon.svg",
                      }}
                    />
                  </DropdownItem>
                  {/* <LoginModal/> */}
                  <DropdownItem key="login-btn" onPress={onOpenLogin}>
                    Iniciar Sesión
                  </DropdownItem>
                  <DropdownItem key="signup-btn" onPress={onOpenChangeSignUp}>
                    Registrarse
                  </DropdownItem>
                  {currentUser.username && (
                    <DropdownItem key="logout-btn" onPress={handleLogout}>
                      Logout
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
