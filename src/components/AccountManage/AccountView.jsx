"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image,
  Spinner
} from "@nextui-org/react";
import { useGDIcon } from "@/robtop/iconkit/useGDIcon";
import { getAccountAction } from "@/actions/accounts/getAccountAction";
import AccountStatsRow from "../Admin/UserModalPanel/AccountStatsRow";
import AccountIconsRow from "../Admin/UserModalPanel/AccountIconsRow";
import AccountStuff from "./AccountStuff";
import { getStuffItemsAction } from "@/actions/accounts/stuffActions";
import RecordsLinkButton from "../Records/RecordsLinkButton";
export default function AccountView({manage = false, username }) {
  
  const { icon: iconAvatar } = useGDIcon({
    type: "cube",
    username: username,
    effectDeps: [username],
  });

  const [account, setAccount] = useState(undefined);
  const [accountStuff, setAccountStuff] = useState(undefined);

  const loadAccount = async() => {
    const account = JSON.parse(
      await getAccountAction({ username: username })
    );
    const stuff = JSON.parse(
      await getStuffItemsAction({accountid: account.accountid})
    );
    setAccount(account);
    setAccountStuff(stuff)
  };

  useEffect(() => {
    if (username == undefined) return;
    loadAccount();
  }, [username]);

  return (
    <>
      <Card className="max-w-[1000px] w-[800px]">
        <CardHeader className="flex justify-between">
          <div className="flex flex-row gap-3 ">
            <Image
              alt="Cube"
              radius='none'
              src={iconAvatar}
              width={40}
            />
            <div className="flex flex-col justify-center">
              <p className="text-2xl">{username}</p>
            </div>
          </div>
          <div className="flex">
            <RecordsLinkButton username={username} mini={true}/>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col justify-center items-center gap-3">
          {account != undefined ? (
            <>
              <AccountStatsRow user={account} />
              <AccountIconsRow user={account} />
              <Divider />
              <AccountStuff 
                account={account}
                setAccount={setAccount}
                stuffItems={accountStuff}
                setStuffItems={setAccountStuff}
                loadAccount={loadAccount}
                manage={manage}
              />
            </>
          ) : (
            <div className="flex flex-col h-[300px] justify-center items-center">
              <Spinner/>
              <p className="text-medium">Descargando cuenta</p>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  )
}
