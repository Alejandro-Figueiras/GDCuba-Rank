import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider
} from "@nextui-org/react";
import React, {
  useEffect,
  useState,
} from "react";

import AccountStatsRow from "./Admin/UserModalPanel/AccountStatsRow";
import AccountIconsRow from "./Admin/UserModalPanel/AccountIconsRow";
import GDSpinner from "@/components/GDIcons/GDSpinner";
import AccountStuff from "./AccountManage/AccountStuff";

export default function UserModalView({ user, isOpen, onOpenChange }) {
  if (!user) return null
  const { account, stuff = [] } = user
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(isOpen && account.isLoading);
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
              {account.username}
            </ModalHeader>
            {isLoading ? (
              <div className="p-2 w-full flex justify-center items-center my-6">
                <GDSpinner className={"w-10 h-10"} />
              </div>
            ) : (
              <>
                <ModalBody>
                  <AccountStatsRow user={account} />
                  <AccountIconsRow user={account} />
                  {stuff.length != 0 && <Divider />}
                  <AccountStuff
                    account={account}
                    stuffItems={stuff}
                    manage={false}
                  />
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
