'use client'
import { useSesion } from "@/hooks/useSesion";
import { useGDIcon } from "@/robtop/iconkit/useGDIcon";
import { useEffect } from 'react'
import {
  Image,
  Divider
} from '@nextui-org/react'
import { getAccountAction } from "@/actions/admin/getAccountAction";

export default function AccountMe() {
  const { currentUser } = useSesion();
  const { icon: iconAvatar } = useGDIcon({
    type: "cube",
    username: currentUser.username,
    effectDeps: [currentUser.username],
  });

  useEffect(() => {
    if (currentUser.username == undefined) return;
    const loadFullUser = async () => {
      const account = JSON.parse(
        await getAccountAction({ username: currentUser.username })
      );
      // setFullUser(account);
    };
    // loadFullUser();
  }, [currentUser]);

  return (<div className="max-w-[800px] mx-auto my-8">
    <header className="flex gap-4 my-2">
      <Image
        alt="Cube"
        height={40}
        radius='none'
        src={iconAvatar}
        width={80}
      />
      <div className="flex flex-col">
        <p className="text-2xl">{currentUser.username}</p>
      </div>
    </header>
    <Divider />
  </div>)
}