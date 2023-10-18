import React, { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    username: undefined,
    accountID: undefined,
  });

  useEffect(() => {
    async function auth() {
      const result = await fetch("http://localhost:3000/api/auth/me");
      const data = await result.json();
      
      setCurrentUser({username: data.username, accountID: data.accountID});
    }

    auth();
  }, []);
  return (
    <GlobalContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </GlobalContext.Provider>
  );
}
