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
} from "@nextui-org/react";
import { useSesion } from "@/hooks/useSesion";
import { useGDIcon } from "@/robtop/iconkit/useGDIcon";
import { useUser } from "@/hooks/useUser";
import { getAccountAction } from "@/actions/admin/getAccountAction";
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
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  ) : (
    <NoAccount />
  );
}

const NoAccount = ({message}) => {
    const defaultMessage = "Necesitas una cuenta para esta sección xd";
  return (
    <div className="flex justify-center items-center h-[400px] flex-col">
      <h2 className="text-xl">{message || defaultMessage}</h2>
      <p>
        <span className="text-cyan-600 font-semibold cursor-pointer">Inicia sesion</span> o{" "}
        <span className="text-cyan-600 font-semibold cursor-pointer">Registrate</span>
      </p>
    </div>
  );
};
