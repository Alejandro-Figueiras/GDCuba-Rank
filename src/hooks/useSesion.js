import { GlobalContext } from "@/app/context/GlobalContext";
import { useContext } from "react";

export const useSesion = () => {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);

  const logout = () => {
    setCurrentUser({
      username: undefined,
      accountID: undefined,
    });
  };

  return { currentUser, logout };
};
