import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({
        username: '',
        accountID: '',
    })
  return <GlobalContext.Provider value={{currentUser, setCurrentUser}}>{children}</GlobalContext.Provider>;
}
