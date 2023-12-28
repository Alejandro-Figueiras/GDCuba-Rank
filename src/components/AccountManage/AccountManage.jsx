"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Tooltip,
  Accordion,
  AccordionItem,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalContent,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useSesion } from "@/hooks/useSesion";
import { useGDIcon } from "@/robtop/iconkit/useGDIcon";
import { useUser } from "@/hooks/useUser";
import { getAccountAction } from "@/actions/admin/getAccountAction";
import { NoAccount } from "../NoAccount";
import AccountStatsRow from "../Admin/UserModalPanel/AccountStatsRow";
import GDSpinner from "../GDIcons/GDSpinner";
import AccountIconsRow from "../Admin/UserModalPanel/AccountIconsRow";
import { EditIcon } from "../Icons/EditIcon";
import { routes } from "../../../staticFiles";
import { PlusIcon } from "../Icons/PlusIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import { ModalContext } from "@/app/context/ModalContext";
import { SearchIcon } from "../Icons/SearchIcon";
import { AccountGDStuff } from "./AccountGDStuff";
import ChangeModal from "./ChangeModal";
import AccountSearchLevel from "./AccountSearchLevel";
export default function AccountManage() {
  const { currentUser } = useSesion();
  const { icon: iconAvatar } = useGDIcon({
    type: "cube",
    username: currentUser.username,
    effectDeps: [currentUser.username],
  });

  const [fullUser, setFullUser] = useState(undefined);
  const [changes, setChanges] = useState(new Map());

  const [defaultModalData, setDefaultModalData] = useState({
    key: undefined,
    value: "",
  });

  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const {
    isOpen: isOpenSearch,
    onOpenChange: onOpenChangeSearch,
    onOpen: onOpenSearch,
  } = useDisclosure();

  useEffect(() => {
    if (currentUser.username == undefined) return;
    const loadFullUser = async () => {
      const account = JSON.parse(
        await getAccountAction({ username: currentUser.username })
      );
      setFullUser(account);
    };
    loadFullUser();
  }, [currentUser]);

  const openModal = (key, defaultValue) => {
    setDefaultModalData({ value: defaultValue, key });
    onOpen();
  };

  const openSearchModal = (key, defaultValue) => {
    setDefaultModalData({ value: defaultValue, key });
    onOpenSearch();
  };

  const updateChanges = (key, value) => {
    if (changes.has(key) && value == currentUser[key]) {
      changes.delete(key);
    } else if (value != currentUser[key]) {
      changes.set(key, value);
    }
  };

  return currentUser.username != null ? (
    <>
      <Card className="max-w-[1000px] w-[800px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src={iconAvatar}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{currentUser.username}</p>
            <Tooltip content="Frase que verán todos los usuarios al ver tu cuenta">
              <p
                className="text-small text-default-500 flex gap-2 justify-center items-center cursor-pointer"
                onClick={() =>
                  openModal(
                    "greeting",
                    changes.get("greeting") || currentUser.greeting
                  )
                }
              >
                {currentUser.greeting != null && currentUser.greeting !== ""
                  ? changes.get("greeting") || currentUser.greeting
                  : "No tienes ningun saludo definido"}
                <span>
                  <EditIcon />
                </span>
              </p>
            </Tooltip>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col justify-center items-center gap-3">
          {fullUser != undefined ? (
            <>
              <AccountStatsRow user={fullUser} />
              <AccountIconsRow user={fullUser} />
              <AccountGDStuff dbuser={currentUser} openModal={openSearchModal} />
              {/* <AccountComments /> */}
            </>
          ) : (
            <GDSpinner />
          )}
        </CardBody>
        <Divider />
        <CardFooter className="justify-evenly item-center flex gap-4">
          <Button
            color="primary"
            variant="solid"
            onPress={() => console.log("aplicar cambios")}
            className="w-[45%] max-w-200px"
            isDisabled={changes.size == 0}
          >
            Aplicar
          </Button>
          <Button
            color="default"
            variant="flat"
            onPress={() => console.log("Revertir cambios")}
            className="w-[40%] max-w-200px"
          >
            Revertir
          </Button>
        </CardFooter>
      </Card>
      <ChangeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        updateChanges={updateChanges}
        defaultModalData={defaultModalData}
      />
      <AccountSearchLevel
        isOpen={isOpenSearch}
        onOpenChange={onOpenChangeSearch}
        updateChanges={updateChanges}
        defaultModalData={defaultModalData}
      />
    </>
  ) : (
    <NoAccount />
  );
}
