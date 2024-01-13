"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Tooltip,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useSesion } from "@/hooks/useSesion";
import { useGDIcon } from "@/robtop/iconkit/useGDIcon";
import { getAccountAction } from "@/actions/admin/getAccountAction";
import { NoAccount } from "../NoAccount";
import AccountStatsRow from "../Admin/UserModalPanel/AccountStatsRow";
import GDSpinner from "../GDIcons/GDSpinner";
import AccountIconsRow from "../Admin/UserModalPanel/AccountIconsRow";
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
  }, [currentUser]);

  return currentUser.username != null ? (
    <>
      <Card className="max-w-[1000px] w-[800px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="Cube"
            radius='none'
            src={iconAvatar}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-2xl">{currentUser.username}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col justify-center items-center gap-3">
          {fullUser != undefined ? (
            <>
              <AccountStatsRow user={fullUser} />
              <AccountIconsRow user={fullUser} />
              
              
            </>
          ) : (
            <GDSpinner />
          )}
        </CardBody>
        <Divider />
      </Card>
    </>
  ) : (
    <NoAccount />
  );
}
