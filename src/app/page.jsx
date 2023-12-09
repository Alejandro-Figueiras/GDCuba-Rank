"use client";

import NavBar from "@/components/NavBar/NavBar";
import { apiRequest } from "@/libs/serverRequest";
import { notify, notifyDismiss } from "@/libs/toastNotifications";
import config from "../../config";
import { useContext } from "react";
import { ModalContext } from "./context/ModalContext";
import GDIcon from "@/robtop/iconkit/GDIcon";

export default function Home() {
  const { openModal } = useContext(ModalContext);
  return (
    <>
      <NavBar />
      <button
        onClick={async () => {
          
        }}
      >
        Test
      </button>
      <GDIcon type="cube"/>
    </>
  );
}
