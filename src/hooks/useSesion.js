import { GlobalContext } from "@/app/context/GlobalContext";
import { ModalContext } from "@/app/context/ModalContext";
import { useContext } from "react";

export const useSesion = () => {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const {onOpenLogin, onOpenSignUp, onOpenPassword} = useContext(ModalContext);

  const logout = () => {
    setCurrentUser({
      username: undefined,
      accountid: undefined,
    });
  };

  const signUp = () => {
    onOpenSignUp();
  };

  const login = () => {
    onOpenLogin();
  };

  const changePassword = () => {
    onOpenPassword();
  }

  return { currentUser, logout, signUp, login, changePassword };
};
