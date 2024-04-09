"use client";
import React, { useRef, useState } from "react";

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
import config from "../../../config";
import { register } from "@/actions/register/register";


export default ({ isOpen, onOpenChange }) => {
  const [fieldsError, setFieldsError] = useState({
    userField: false,
    notMatchPassword: false,
  });

  const [canSubmit, setCanSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const phoneRef = useRef();
  const userRef = useRef();
  const passwordRef = useRef();
  const passwordSecureRef = useRef();

  const updateCanSubmit = () => {
    const validUser = !fieldsError.userField;
    const validPassword =
      passwordRef.current.value.length > 0 && !fieldsError.notMatchPassword;

    setCanSubmit(validPassword && validUser);
  };

  const passwordCheck = () => {
    if (passwordRef.current.value !== passwordSecureRef.current.value) {
      setFieldsError((prev) => ({
        ...prev,
        notMatchPassword: true,
      }));
    } else
      setFieldsError((prev) => ({
        ...prev,
        notMatchPassword: false,
      }));
  };

  const handleSubmit = async (onClose) => {

    setCanSubmit(false);
    setIsLoading(true);
    const formData = {
      username: userRef.current.value,
      phone: phoneRef.current.value,
      password: passwordRef.current.value,
    };

    const data = JSON.parse(await register(formData))
    console.log(data);

    if (data.status == 200) {
      notify(data.message, "success");
      onClose();
    } else {
      notify(data.error, "error");
    }

    setCanSubmit(true);
    setIsLoading(false);
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
            <ModalBody onKeyUp={updateCanSubmit}>
              <Input
                autoFocus
                label="Número de Teléfono"
                placeholder="Ej: +53 51234567"
                type="phone"
                variant="bordered"
                ref={phoneRef}
              />
              <Input
                label="Usuario"
                placeholder="Introduce tu nombre de usuario"
                variant="bordered"
                ref={userRef}
                onChange={() => {
                  if (userRef.current.value.length === 0)
                    setFieldsError((prev) => ({ ...prev, userField: true }));
                  else
                    setFieldsError((prev) => ({ ...prev, userField: false }));
                }}
                errorMessage={
                  fieldsError.userField ? "Este campo no puede estar vacio" : ""
                }
              />
              <Input
                label="Contraseña"
                placeholder="Introduce tu contraseña"
                type="password"
                variant="bordered"
                ref={passwordRef}
                onChange={passwordCheck}
                // onKeyUp={updateCanSubmit}
              />
              <Input
                label="Repite la Contraseña"
                placeholder="Introduce tu contraseña otra vez, para estar seguros"
                type="password"
                variant="bordered"
                ref={passwordSecureRef}
                errorMessage={
                  fieldsError.notMatchPassword
                    ? "Las contraseñas no coinciden"
                    : ""
                }
                onChange={passwordCheck}
                // onKeyUp={updateCanSubmit}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Cerrar
              </Button>
              <Button
              isLoading = {isLoading}
                color={canSubmit ? "primary" : "default"}
                onPress={() => canSubmit && handleSubmit(onClose)}
              >
                Registrarse
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
