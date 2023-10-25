import UserModalPanel from "@/components/Admin/UserModalPanel";
import { apiRequest } from "@/libs/serverRequest";
import Account from "@/models/Account";
import { getAccountByID } from "@/robtop/getAccount";
import { useDisclosure } from "@nextui-org/react";
import React, { createContext, useState } from "react";
import config from "../../../config";
import { notify, notifyDismiss } from "@/libs/toastNotifications";
import { operationText, responseText } from "@/locales/siteText";

export const AdminContext = createContext();

export default function AdminProvider({ children }) {
  const [userInCheck, setUserInCheck] = useState(new Account());
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loadingUser, setLoadingUser] = useState(false);

  const openUserGestorFor = async (user) => {
    setUserInCheck((prev) => ({ ...prev, username: user.username }));
    onOpen();
    setLoadingUser(true);

    const accountRequest = await apiRequest(
      `${config.apiURL}/users/${user.accountid}`
    );
    if (!accountRequest.isError()) {
      setUserInCheck({
        ...accountRequest.result,
        phone: user.phone,
        role: user.role,
        status: user.status,
        playerType: user.playertype
      });
      console.log(accountRequest.result);
    } else {
      onClose();
      notify(responseText.error, "error");
    }
    setLoadingUser(false);
    console.log(user)
  };

  return (
    <AdminContext.Provider
      value={{ userInCheck, setUserInCheck, openUserGestorFor }}
    >
      <UserModalPanel
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        user={userInCheck}
        isLoading={loadingUser}
      />
      {children}
    </AdminContext.Provider>
  );
}
