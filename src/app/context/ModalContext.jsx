import { getAccountAction } from "@/actions/accounts/getAccountAction";
import ModalAccept from "@/components/Admin/ModalAccept";
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

  const openModal = ({ title, desc, onSubmit, action = "none" }) => {
    if (!isOpen) {
      console.log("Opening modal");
      onOpen();
      setCurrent({ title, desc, action, onSubmit });
    }
  };

  const openUserView = async (user) => {
    const shouldLoad = user.stars == null;
    setCurrentUetuserInView({ ...user, isLoading: shouldLoad });
    onOpenUserView();

    if (shouldLoad) {
      const account = JSON.parse(
        await getAccountAction({ username: user.username })
      );
      setCurrentUetuserInView(account);
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, openUserView, onOpenLogin, onOpenSignUp }}>
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

      {/* Sign up Form */}
      <SignUp isOpen={isOpenSignUp} onOpenChange={onOpenChangeSignUp} />
      {children}
    </ModalContext.Provider>
  );
}
