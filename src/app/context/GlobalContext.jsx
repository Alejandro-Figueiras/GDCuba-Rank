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
  const [appliactionLoading, setAppliactionLoading] = useState({ toast: null });
  let firstAssembly = false;

  useEffect(() => {
    async function auth() {
      if (firstAssembly) return;
      setGlobaLoading(true);
      const apiResult = await apiRequest(config.apiURL + "auth/me");

      if (!apiResult.isError(false)) {
        const data = apiResult.result;
        if (data)
          setCurrentUser({
            username: data.username,
            accountID: data.accountID,
          });
      }
      setGlobaLoading(false);
    }

    auth();
    firstAssembly = true;
  }, []);

  const setGlobaLoading = (loading) => {
    if (loading && !appliactionLoading.toast) {
      const loading = notify("Cargando, espera un momento", "loading");
      setAppliactionLoading({ toast: loading });
    }
    if (!loading) {
      notifyDismiss(appliactionLoading.toast);
      setAppliactionLoading({ toast: null });
    }
  };

  return (
    <GlobalContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </GlobalContext.Provider>
  );
}
