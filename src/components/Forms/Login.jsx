"use client";
import React, { useContext, useRef, useState } from "react";

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
import { log } from "../../helpers/log";
import { SelectSection } from "@nextui-org/react";
import { GlobalContext } from "@/app/context/GlobalContext";
import { toast } from "react-toastify";
import { notify, notifyDismiss } from "@/libs/toastNotifications";

export default ({ isOpen, onOpenChange }) => {
  const userRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const {setCurrentUser} = useContext(GlobalContext);
  

  const handleSubmitButton = async (action, onClose) => {
    if (action == "submit") {
      const formData = {
        username: userRef.current.value,
        password: passwordRef.current.value,
      };
      setLoading(true);

      const info = notify('Loggin, wait a moment...', 'loading');

      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json", // Tipo de contenido del cuerpo (en este caso, JSON)
        },
      });
      const data = await response.json();
      notifyDismiss(info);

      setLoading(false);
      if (data.status == "error") {
        notify(data.message, 'error')
        console.log(data.message);
        return;
      }
      notify(data.message, 'success')
      setCurrentUser(prev => ({...prev, username: formData.username}));
      onClose();
    }
  };

  const onFetched = (data) => {
    if (data.status == "ok") {
      setLoading(false);
      log("Login successfuly");
      return;
    }

    log(data.message);
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
                onPress={onClose}
              >
                Cerrar
              </Button>
              <Button
                color="primary"
                onPress={() => handleSubmitButton("submit", onClose)}
                isLoading={loading}
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
