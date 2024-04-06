"use client"
import { getAccountAction } from "@/actions/accounts/getAccountAction";
import { getStuffItemsAction } from "@/actions/accounts/stuffActions";
import ChangePassword from "@/components/Forms/ChangePassword";
import Login from "@/components/Forms/Login";
import SignUp from "@/components/Forms/SignUp";
import Modal from "@/components/Modal";
import UserModalView from "@/components/UserModalView";
import { useDisclosure } from "@nextui-org/react";
import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export default function ModalProvider({ children }) {
  const [current, setCurrent] = useState({
    title: undefined,
    desc: undefined,
    type: "normal",
    onSubmit: () => {},
  });
  const [currentUserInView, setCurrentUetuserInView] = useState(undefined);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenUserView,
    onOpen: onOpenUserView,
    onOpenChange: onOpenChangeUserView,
  } = useDisclosure();
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onOpenChange: onOpenChangeLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenSignUp,
    onOpen: onOpenSignUp,
    onOpenChange: onOpenChangeSignUp,
  } = useDisclosure();
  const {
    isOpen: isOpenPassword,
    onOpen: onOpenPassword,
    onOpenChange: onOpenChangePassword,
  } = useDisclosure();

  const openModal = ({ title, desc, onSubmit, action = "none" }) => {
    if (!isOpen) {
      console.log("Opening modal");
      onOpen();
      setCurrent({ title, desc, action, onSubmit });
    }
  };

  const openUserView = async (user) => {
    const shouldLoad = user.stars == null;
    setCurrentUetuserInView({ account: user, stuff: [], isLoading: shouldLoad, isStuffLoading: user && user.stuff != '' });
    onOpenUserView();
    if (shouldLoad) {
      user = JSON.parse(
        await getAccountAction({ username: user.username })
      );
    }
    const stuff = (user.stuff != '')?JSON.parse(
      await getStuffItemsAction({accountid: user.accountid})
    ) : []
    ;
    setCurrentUetuserInView({account: user, stuff});
  };

  return (
    <ModalContext.Provider value={{ openModal, openUserView, onOpenLogin, onOpenSignUp, onOpenPassword }}>
      <UserModalView
        user={currentUserInView}
        onOpenChange={onOpenChangeUserView}
        isOpen={isOpenUserView}
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={current.title}
        desc={current.desc}
        action={current.action}
        submit={current.onSubmit}
      />
      <Login isOpen={isOpenLogin} onOpenChange={onOpenChangeLogin} />
      <SignUp isOpen={isOpenSignUp} onOpenChange={onOpenChangeSignUp} />
      <ChangePassword isOpen={isOpenPassword} onOpenChange={onOpenChangePassword}/>
      {children}
    </ModalContext.Provider>
  );
}
