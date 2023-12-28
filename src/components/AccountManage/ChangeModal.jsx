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

export default function ChangeModal({
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
            <ModalHeader>Cambiar valor</ModalHeader>
            <ModalBody>
              <Input
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
                onPress={() => {
                  updateChanges(modalData.key, modalData.value);
                  onClose();
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
