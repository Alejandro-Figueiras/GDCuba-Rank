"use client";
import React, { useRef } from "react";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

// Modals
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { notify, notifyDismiss } from "@/libs/toastNotifications";

export default ({ isOpen, onOpenChange }) => {
  const phoneRef = useRef();
  const userRef = useRef();
  const passwordRef = useRef();
  const passwordSecureRef = useRef();

  const handleSubmit = async (onClose) => {
    const password = passwordRef.current.value;
    const passwordSecure = passwordSecureRef.current.value;

    if (password.trim() != passwordSecure.trim()) {
      return notify("Las contraseñas no coinciden", "error");
    }

    const laodingNotift = notify("Loading, please wait", "loading");
    const formData = {
      username: userRef.current.value,
      phone: phoneRef.current.value,
      password: passwordRef.current.value,
    };

    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json", // Tipo de contenido del cuerpo (en este caso, JSON)
      },
    });
    notifyDismiss(laodingNotift);
    const data = await response.json();
    console.log(data);

    if (response.status == 200) {
      notify(data.message, "success");
      onClose();
    }
    else {
      notify(data.error, "error");
    }
  };

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
                placeholder="Ej: 55390833"
                type="number"
                variant="bordered"
                ref={phoneRef}
              />
              <Input
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
              <Input
                label="Repite la Contraseña"
                placeholder="Introduce tu contraseña otra vez, para estar seguros"
                type="password"
                variant="bordered"
                ref={passwordSecureRef}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="primary" onPress={() => handleSubmit(onClose)}>
                Registrarse
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
