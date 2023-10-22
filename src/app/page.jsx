'use client'

import NavBar from "@/components/NavBar/NavBar"
import { apiRequest } from "@/libs/serverRequest";
import { notify, notifyDismiss } from "@/libs/toastNotifications";
import config from "../../config";

export default function Home() {
  return (
    <>
      <NavBar />
      <button onClick={async() => {
        const user = 'mamawebazo';
        const loading = notify(`Eliminando a ${user}`, "loading");
        const apiResult = await apiRequest(
          config.apiURL + `admin/users/remove/${user}`
        );
    
        if (!apiResult.isError()) {
          const success = notify(`Usuario ${user} eliminado`, "success");
        } else {
          const error = notify(`Error al eliminar a ${user}`, "error");
          apiResult.show();
        }
        notifyDismiss(loading);
      }}>Test</button>
    </>
  )
}
