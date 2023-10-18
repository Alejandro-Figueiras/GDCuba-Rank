'use client'
import React from "react";

import {Button} from "@nextui-org/button";
import { Input } from "@nextui-org/input";


// Modals
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/modal";

export default ({isOpen, onOpenChange}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Registrarse
            </ModalHeader>
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
  );
}
