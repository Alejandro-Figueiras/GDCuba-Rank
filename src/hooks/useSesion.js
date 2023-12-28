import { GlobalContext } from "@/app/context/GlobalContext";
import { ModalContext } from "@/app/context/ModalContext";
import { useContext } from "react";

export const useSesion = () => {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const {onOpenLogin, onOpenSignUp} = useContext(ModalContext);

  const logout = () => {
    setCurrentUser({
      username: undefined,
      accountID: undefined,
    });
  };

  const signUp = () => {
    onOpenSignUp();
  };

  const login = () => {
    onOpenLogin();
  };

  return { currentUser, logout, signUp, login };
};
