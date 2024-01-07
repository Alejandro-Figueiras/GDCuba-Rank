import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import React, {
  useEffect,
  useState,
} from "react";

import AccountStatsRow from "./Admin/UserModalPanel/AccountStatsRow";
import AccountIconsRow from "./Admin/UserModalPanel/AccountIconsRow";
import GDSpinner from "@/components/GDIcons/GDSpinner";

export default function UserModalView({ user, isOpen, onOpenChange }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(isOpen && user.isLoading);
  }, [user]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={!isLoading ? "2xl" : ""}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              {user.username}
            </ModalHeader>
            {isLoading ? (
              <div className="p-2 w-full flex justify-center items-center my-6">
                <GDSpinner className={"w-10 h-10"} />
              </div>
            ) : (
              <>
                <ModalBody>
                  <AccountStatsRow user={user} />
                  <AccountIconsRow user={user} />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onPress={async (e) => {
                      onClose();
                    }}
                  >
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
