import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardBody,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import React from "react";

function AccountStat({ value, icon = null }) {
  return (
    <div className="flex gap-3 items-center justify-center relative">
      <span className="bg-default-300 w-5 h-5 flex items-center justify-center p-2">
        {icon ? <img src={icon} className="object-cover w-full absolute top-0 left-0"/> : "ic"}
      </span>
      <span>{value}</span>
    </div>
  );
}

export default function UserModalPanel({
  user,
  isOpen,
  onOpenChange,
  isLoading,
}) {
  // const
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              {user.userName}
            </ModalHeader>
            {isLoading ? (
              <Spinner />
            ) : (
              <ModalBody>
                <div className="h-8">
                  <div className="flex justify-between">
                    <AccountStat value={user.stars} />
                    <AccountStat value={user.diamonds} />
                    <AccountStat value={user.secretCoins} />
                    <AccountStat value={user.usercoins} />
                    <AccountStat value={user.demons} />
                    <AccountStat value={user.creatorpoints} />
                  </div>
                </div>
                <Card className="bg-default-200">
                  <CardBody>
                    <div>ICONOS</div>
                  </CardBody>
                </Card>
                <Card className="bg-default-100 h-[300px]">
                  <CardBody>
                    <div>BODY</div>
                  </CardBody>
                </Card>
              </ModalBody>
            )}
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Actualizar
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
