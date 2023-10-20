import React, { createContext, useEffect, useState } from "react";
import {apiRequest} from '@/libs/serverRequest.js'
import config from "../../../config.js";


export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    username: undefined,
    accountID: undefined,
  });

  useEffect(() => {
    async function auth() {
      const apiResult = await apiRequest(config.apiURL + "auth/me");
      
      if (!apiResult.isError(false)) {
        const data = apiResult.result;
        if (data)
          setCurrentUser({username: data.username, accountID: data.accountID}); 
      }
      // const result = await fetch("http://localhost:3000/api/auth/me");
      // const data = await result.json();      
      // console.log();
    }

    auth();
  }, []);
  return (
    <GlobalContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </GlobalContext.Provider>
  );
}
