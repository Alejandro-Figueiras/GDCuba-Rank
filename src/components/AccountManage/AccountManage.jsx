"use client";

import React, { useEffect, useMemo, useState } from "react";
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
export default function AccountManage() {
  const { currentUser } = useSesion();
  const { icon: iconAvatar } = useGDIcon({
    type: "cube",
    username: currentUser.username,
    effectDeps: [currentUser.username],
  });

  const [fullUser, setFullUser] = useState(undefined);

  useEffect(() => {
    if (currentUser.username == undefined) return;
    const loadFullUser = async () => {
      const account = JSON.parse(
        await getAccountAction({ username: currentUser.username })
      );
      setFullUser(account);
    };

    loadFullUser();
    // Promise.resolve(getUser({ username: currentUser.username }))
    // .then(data => console.log(data));
  }, [currentUser]);

  useEffect(() => {
    console.log(fullUser);
  }, [fullUser]);

  return currentUser.username != null ? (
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
            <p className="text-small text-default-500 flex gap-2 justify-center items-center cursor-pointer">
              ¡Hola, estoy usando GDC!
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
            <AccountGDStuff />
            <AccountComments/>
          </>
        ) : (
          <GDSpinner />
        )}
      </CardBody>
      <Divider />
      <CardFooter className="justify-evenly item-center flex gap-4">
        <Button
          color="primary"
          variant="flat"
          onPress={() => console.log("aplicar cambios")}
          className="w-[45%] max-w-200px"
        >
          Aplicar
        </Button>
        <Button
          color="default"
          variant="flat"
          onPress={() => console.log("Revertir cambios")}
          className="w-[40%] max-w-200px"
        >
          Cancelar
        </Button>
      </CardFooter>
    </Card>
  ) : (
    <NoAccount />
  );
}

function AccountComments() {
    return <p>Pan con jamon</p>
}

function AccountGDStuff() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion variant="shadow">
      <AccordionItem
        key="1"
        aria-label="Accordion 1"
        title="Demon mas dificil"
        startContent={<img src={routes.demon.defaultFace} width={30} />}
      >
        Demon mas dificil
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Accordion 2"
        title="Mejor nivel"
        startContent={<img src={routes.cp} width={30} />}
      >
        Mejor nivel
      </AccordionItem>
    </Accordion>
  );
}
