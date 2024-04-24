import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

const ModalAccept = ({isOpen, onOpenChange, title, submit}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {title}
            </ModalHeader>
            
            <ModalFooter>
              <Button
                color="primary"
                onPress={(e) => {
                  submit(e)
                  onClose()
                }}
              >
                Adelante
              </Button>
              <Button
                color="default"
                variant="flat"
                onPress={onClose}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )	
}

export default ModalAccept