import React, { createContext, useEffect, useState } from "react";
import { apiRequest } from "@/libs/serverRequest.js";
import config from "../../../config.js";
import { notify, notifyDismiss } from "@/libs/toastNotifications.js";
import { authMe } from "@/actions/auth/me.js";

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    username: undefined,
    accountID: undefined,
    phone: undefined,
    role: undefined
  });
  const [appliactionLoading, setAppliactionLoading] = useState({ toast: null });
  let firstAssembly = false;

  useEffect(() => {
    async function auth() {
      if (firstAssembly) return;
      const data = JSON.parse(await authMe());

      if (!data.error) {
        if (data)
          setCurrentUser({
            username: data.username,
            accountID: data.accountID,
            phone: data.phone,
            role: data.role
          });
      }
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
