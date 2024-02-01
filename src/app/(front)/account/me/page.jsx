"use client"
import { useSesion } from "@/hooks/useSesion";
import React from "react";
import AccountView from "@/components/AccountManage/AccountView";

export default () => {
  const { currentUser } = useSesion();
  return (
    <div className="flex justify-center p-4">
      <AccountView username={currentUser.username} manage={true}/>
    </div>
  );
};
