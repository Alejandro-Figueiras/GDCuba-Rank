import { ModalContext } from "@/app/context/ModalContext";
import { useContext } from "react";

export const useUser = () => {
  const { openUserView: openView } = useContext(ModalContext);
  const getUser = async ({ username }) => {
    const account = JSON.parse(await getAccountAction({ username }));
    return account;
  };

  const openUserView = (user) => {
    openView(user);
  };

  return { getUser, openUserView };
};
