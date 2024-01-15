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
import { getAccountAction } from "@/actions/accounts/getAccountAction";
import { NoAccount } from "../NoAccount";
import AccountStatsRow from "../Admin/UserModalPanel/AccountStatsRow";
import GDSpinner from "../GDIcons/GDSpinner";
import AccountIconsRow from "../Admin/UserModalPanel/AccountIconsRow";
import AccountStuffMe from "./AccountStuffMe";
import { getStuffItemsAction } from "@/actions/accounts/stuffActions";
export default function AccountManage() {
  const { currentUser } = useSesion();
  const { icon: iconAvatar } = useGDIcon({
    type: "cube",
    username: currentUser.username,
    effectDeps: [currentUser.username],
  });

  const [account, setAccount] = useState(undefined);
  const [accountStuff, setAccountStuff] = useState(undefined);

  useEffect(() => {
    if (currentUser.username == undefined) return;
    const loadAccount = async () => {
      const account = JSON.parse(
        await getAccountAction({ username: currentUser.username })
      );
      const stuff = JSON.parse(
        await getStuffItemsAction({accountid: currentUser.accountid})
      );
      setAccount(account);
      setAccountStuff(stuff)
    };
    loadAccount();
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
          {account != undefined ? (
            <>
              <AccountStatsRow user={account} />
              <AccountIconsRow user={account} />
              <Divider />
              <AccountStuffMe 
                account={account}
                setAccount={setAccount}
                stuffItems={accountStuff}
                setStuffItems={setAccountStuff}

              />
            </>
          ) : (
            <GDSpinner />
          )}
        </CardBody>
      </Card>
    </>
  ) : (
    <NoAccount />
  );
}
