'use client'
import React from "react";
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/dropdown";

import { User } from "@nextui-org/user"
import {Button} from "@nextui-org/button";

// Modals
import { useDisclosure } from "@nextui-org/modal";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";

export default () => {
  const {isOpen: isOpenLogin, onOpen: onOpenLogin, onOpenChange: onOpenChangeLogin} = useDisclosure();
  const {isOpen: isOpenSignUp, onOpen: onOpenSignUp, onOpenChange: onOpenChangeSignUp} = useDisclosure();

  return (
    <>
      <Navbar isBordered maxWidth="2xl">
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarItem>
            <p className="font-bold text-inherit text-xl pr-4">GD Cuba ΔΔΔ</p>
          </NavbarItem>
          <NavbarItem>
            NavBar Provisional
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button color="default" variant="flat">
                  Sin cuenta
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
                  <DropdownItem key="login-btn" onPress={onOpenLogin} >
                    Iniciar Sesión
                  </DropdownItem>
                  <DropdownItem key="signup-btn" onPress={onOpenChangeSignUp}>Registrarse</DropdownItem>
                </DropdownSection>

              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Modal Login */}
      <Modal 
          isOpen={isOpenLogin} 
          onOpenChange={onOpenChangeLogin}
          placement="top-center"
        >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Inicia sesión</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Usuario"
                  placeholder="Introduce tu nombre de usuario"
                  variant="bordered"
                />
                <Input
                  label="Contraseña"
                  placeholder="Introduce tu contraseña"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Link color="primary" href="#" size="sm">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Adelante
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Sign up Form */}
      <Modal 
        isOpen={isOpenSignUp} 
        onOpenChange={onOpenChangeSignUp}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Registrarse</ModalHeader>
              <ModalBody>
              <Input
                autoFocus
                label="Número de Teléfono"
                placeholder="+53 XDXDXD"
                type="phone"
                variant="bordered"
              />
              <Input
                label="Cuenta de Geometry Dash"
                placeholder="Introduce tu cuenta de GD"
                variant="bordered"
              />
              <Input
                label="Usuario"
                placeholder="Introduce tu nombre de usuario"
                variant="bordered"
              />
              <Input
                label="Contraseña"
                placeholder="Introduce tu contraseña"
                type="password"
                variant="bordered"
              />
              <Input
                label="Repite la Contraseña"
                placeholder="Introduce tu contraseña otra vez, para estar seguros"
                type="password"
                variant="bordered"
              />

              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Registrarse
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}