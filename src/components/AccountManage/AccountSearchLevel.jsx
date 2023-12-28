import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../Icons/SearchIcon";
import { getLevelsFromGD } from "@/actions/levels/levels";

export default function AccountSearchLevel({
  onOpenChange,
  isOpen,
  defaultModalData,
  updateChanges,
}) {
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    if (isOpen) {
      setModalData(defaultModalData);
    }
  }, [isOpen]);
  return (
    <Modal onOpenChange={onOpenChange} isOpen={isOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Buscar nivel</ModalHeader>
            <ModalBody>
              <Input
                startContent={<SearchIcon />}
                placeholder="Escribe el nombre del nivel"
                value={modalData.value}
                onChange={(e) =>
                  setModalData((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="flat"
                onPress={async() => {
                  console.log("Buscando", modalData.value);
                  const data = JSON.parse(await getLevelsFromGD({data: "Yatagarasu"}));
                  console.log(data);
                }}
              >
                Aceptar
              </Button>
              <Button color="default" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
