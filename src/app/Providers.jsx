"use client";

import { NextUIProvider } from "@nextui-org/react";
import GlobalContextProvider from "./context/GlobalContext";
import ModalProvider from "./context/ModalContext";

export function Providers({ children }) {
  return (
    <GlobalContextProvider>
      <ModalProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </ModalProvider>
    </GlobalContextProvider>
  );
}
