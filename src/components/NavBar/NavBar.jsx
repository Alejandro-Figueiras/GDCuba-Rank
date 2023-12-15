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
import { ModalContext } from "@/app/context/ModalContext";
import { useSesion } from "@/hooks/useSesion";
import { useGDIcon, useGDIconRef } from "@/robtop/iconkit/useGDIcon";
import { getGDAccount } from "@/database/db.gdaccounts";
import { useEffect, useState } from "react";
import { makeIcon } from "@/robtop/iconkit/makeIcon";

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
  const [iconAvatar, setIconAvatar] = useState("data:image/png;base64,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")
  useEffect(() => {
    
    const currentUrl = window.location.href;
    const hostURL = currentUrl.split("/").slice(0,3).join("/")
    const logic = async() => {
      if (currentUser.username == undefined)  return;
      const gdacc = await getGDAccount(currentUser.username);
      console.log(gdacc)
      let type= 'cube',
        iconNumber= gdacc.accicon,
        c1= gdacc.playercolor,
        c2= gdacc.playercolor2,
        glow= gdacc.accglow
        let img = localStorage.getItem(`${type}_${iconNumber}_${c1}_${c2}_${glow?1:0}`)
      if (!img) {
        img = await makeIcon({type, iconNumber, c1, c2, glow, hostURL})
        localStorage.setItem(`${type}_${iconNumber}_${c1}_${c2}_${glow?1:0}`, img)
      }
      console.log(img)
      setIconAvatar(img)
    }
    logic()
  }, [currentUser.username])

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
                      name={currentUser.username == undefined ? "Invitado" : currentUser.username}
                      description="@none"
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
                  {/* <LoginModal/> */}
                  <DropdownItem key="login-btn" onPress={onOpenLogin}>
                    Iniciar Sesión
                  </DropdownItem>
                  <DropdownItem key="signup-btn" onPress={onOpenChangeSignUp}>
                    Registrarse
                  </DropdownItem>
                  {currentUser.username && (
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
