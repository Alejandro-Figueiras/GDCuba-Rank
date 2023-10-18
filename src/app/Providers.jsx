"use client";

import { NextUIProvider } from "@nextui-org/react";
import GlobalContextProvider from "./context/GlobalContext";

export function Providers({ children }) {
  return (
    <GlobalContextProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </GlobalContextProvider>
  );
}
