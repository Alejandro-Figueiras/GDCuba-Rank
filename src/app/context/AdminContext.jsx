import UserModalPanel from "@/components/Admin/UserModalPanel/UserModalPanel";
import { useDisclosure } from "@nextui-org/react";
import React, { createContext, useState } from "react";
import { notify, notifyDismiss } from "@/libs/toastNotifications";
import { operationText, responseText } from "@/locales/siteText";
import { getAccountAction } from "@/actions/accounts/getAccountAction";

export const AdminContext = createContext();

export default function AdminProvider({ children }) {
  const [userInCheck, setUserInCheck] = useState({});
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loadingUser, setLoadingUser] = useState(false);

  const openUserGestorFor = async (user, updateData) => {
    setUserInCheck((prev) => ({ ...prev, username: user.username }));
    onOpen();
    setLoadingUser(true);

    const account = JSON.parse(await getAccountAction({username: user.username}))
    console.log(account)
    if (account) {
      setUserInCheck({
        ...account,
        phone: user.phone,
        role: user.role,
        status: user.status,
        playerType: user.playertype,
        updateData: updateData
      });
    } else {
      onClose();
      notify(responseText.error, "error");
    }
    setLoadingUser(false);
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
