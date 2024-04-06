import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Spinner
} from "@nextui-org/react";
import React, {
  useEffect,
  useState,
} from "react";

import AccountStatsRow from "./Admin/UserModalPanel/AccountStatsRow";
import AccountIconsRow from "./Admin/UserModalPanel/AccountIconsRow";
import GDSpinner from "@/components/GDIcons/GDSpinner";
import AccountStuff from "./AccountManage/AccountStuff";
import RecordsLinkButton from "./Records/RecordsLinkButton";

export default function UserModalView({ user = {account: {}, stuff: []}, isOpen, onOpenChange }) {
  const { account, stuff = [] } = user
  const [isLoading, setIsLoading] = useState(false);
  const [stuffLoading, setStuffLoading] = useState(false)

  useEffect(() => {
    setIsLoading(isOpen && user.isLoading);
    if (isOpen && !user.isLoading && user.isStuffLoading) setStuffLoading(true)
    else setStuffLoading(false)
  }, [user]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={!isLoading ? "3xl" : ""}
      scrollBehavior='inside'
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
                  {account.stuff != '' && <Divider />}
                  <AccountStuff
                    account={account}
                    stuffItems={stuff}
                    manage={false}
                  />
                  {
                    stuffLoading && <div className="flex flex-col mt-2 items-center">
                      <Spinner />
                      <p className="text-medium">Cargando stuff...</p>
                    </div>
                  }
                </ModalBody>
                <ModalFooter>
                  <RecordsLinkButton username={account.username} />
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
