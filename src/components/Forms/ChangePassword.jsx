"use client";
import React, { useRef, useState } from "react";

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
import { notify } from "@/libs/toastNotifications";

export default ({ isOpen, onOpenChange }) => {;
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const newPasswordRef2 = useRef();
  const [loading, setLoading] = useState(false);
  

  const handleSubmitButton = async (action, onClose) => {
    if (action == "submit") {
      /*const formData = {
        username: "",
        password: passwordRef.current.value,
      };
      setLoading(true);

      const data = JSON.parse(await login(formData))
      setLoading(false);
      if (data.status == "error") {
        notify(data.message, 'error')
        console.log(data.message);
        return;
      }
      notify(data.message, 'success')
      setCurrentUser(prev => ({
        ...prev, 
        ...data
      }));
      onClose();*/
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Cambiar contraseña
            </ModalHeader>
            <ModalBody>
              <Input
                label="Contraseña antigua"
                type="password"
                variant="bordered"
                ref={oldPasswordRef}
              />
              <Input
                label="Nueva Contraseña"
                type="password"
                variant="bordered"
                ref={newPasswordRef}
              />
              <Input
                label="Repite la Contraseña"
                type="password"
                variant="bordered"
                ref={newPasswordRef2}
              />
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
