import { GlobalContext } from "@/app/context/GlobalContext";
import { ModalContext } from "@/app/context/ModalContext";
import { useContext } from "react";

export const useSesion = () => {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  // const {} = useContext(ModalContext);

  const logout = () => {
    setCurrentUser({
      username: undefined,
      accountID: undefined,
    });
  };

  const signUp = () => {

  }

  return { currentUser, logout };
};
