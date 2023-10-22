import React, { createContext, useEffect, useState } from "react";
import { apiRequest } from "@/libs/serverRequest.js";
import config from "../../../config.js";
import { notify, notifyDismiss } from "@/libs/toastNotifications.js";

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    username: undefined,
    accountID: undefined,
  });
  let firstAssembly = false;

  useEffect(() => {
    async function auth() {
      if (firstAssembly) return;
      const loading = notify('Cargando, espera un momento', 'loading');
      const apiResult = await apiRequest(config.apiURL + "auth/me");

      if (!apiResult.isError(false)) {
        const data = apiResult.result;
        if (data)
          setCurrentUser({
            username: data.username,
            accountID: data.accountID,
          });
      }
      notifyDismiss(loading);
    }

    auth();
    firstAssembly = true;
  }, []);
  return (
    <GlobalContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </GlobalContext.Provider>
  );
}
