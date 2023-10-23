import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

export default ({ isOpen, onOpenChange, title, action, desc, submit }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2
                className={
                  action != "delete"
                    ? action != "validate"
                      ? "text-blue-500"
                      : "text-green-500"
                    : "text-red-500"
                }
              >
                {title}
              </h2>
            </ModalHeader>
            <ModalBody>{desc}</ModalBody>
            <ModalFooter>
              <Button
                color={
                  action != "delete"
                    ? action != "validate"
                      ? "primary"
                      : "success"
                    : "danger"
                }
                onPress={(e) => {
                  submit(e);
                  onClose();
                }}
              >
                <span className="text-white">{translate(action)}</span>
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
};

const translate = (action) => {
  switch (action) {
    case "delete":
      return "Funar";
    case "validate":
      return "Validar";
    default:
      return "Aceptar";
  }
};
