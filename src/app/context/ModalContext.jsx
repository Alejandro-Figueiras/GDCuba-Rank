import ModalAccept from "@/components/Admin/ModalAccept";
import Modal from "@/components/Modal";
import { useDisclosure } from "@nextui-org/react";
import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export default function ModalProvider({ children }) {
  const [current, setCurrent] = useState({
    title: undefined,
    desc: undefined,
    type: "normal",
    onSubmit: () => {}
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const openModal = ({ title, desc, onSubmit, action = "none" }) => {
    if (!isOpen) {
      console.log("Opening modal");
      onOpen();
      setCurrent({ title, desc, action, onSubmit });
    }
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={current.title}
        desc={current.desc}
        action={current.action}
        submit={current.onSubmit}
      />
      {children}
    </ModalContext.Provider>
  );
}
