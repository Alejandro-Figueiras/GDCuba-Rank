"use client";
import React, { useRef } from "react";

import { Button } from "@nextui-org/button";

// Modals
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { log } from "../../../helpers/log";

export default ({ isOpen, onOpenChange }) => {
  const userRef = useRef();
  const passwordRef = useRef();

  const handleSubmitButton = (action, onClose) => {
    if (action == "submit") {
      const user = userRef.current.value;
      const passwordRef = passwordRef.current.value;
      
    }
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Inicia sesión
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Usuario"
                placeholder="Introduce tu nombre de usuario"
                variant="bordered"
                ref={userRef}
              />
              <Input
                label="Contraseña"
                placeholder="Introduce tu contraseña"
                type="password"
                variant="bordered"
                ref={passwordRef}
              />
              <div className="flex py-2 px-1 justify-between">
                <Link color="primary" href="#" size="sm">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="flat"
                onPress={() => handleSubmitButton("close", onClose)}
              >
                Cerrar
              </Button>
              <Button
                color="primary"
                onPress={() => handleSubmitButton("submit", onClose)}
              >
                Adelante
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
