import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { ModalContext } from "@/app/context/ModalContext";

import { User } from "@nextui-org/user";
import { Button } from "@nextui-org/button";
import { useGDIcon } from "@/robtop/iconkit/useGDIcon";
import { useContext } from "react";
import { apiRequest } from "@/libs/serverRequest";
import config from "../../../config";
import { usePathname } from "next/navigation";

const UserDropdown = ({currentUser, onOpenLogin, onOpenChangeSignUp, logout}) => {
  const ruta = usePathname()
  const admin = ruta.startsWith('/admin')
  const { openModal } = useContext(ModalContext);
  const handleLogout = async () => {
    const apiResult = await apiRequest(config.apiURL + "logout");
    if (apiResult.isError()) {
      return notify(operationText.error, "error");
    }
    logout();
  };

  // Icon
  const {icon: iconAvatar} = useGDIcon({
    type: 'cube',
    username: currentUser.username,
    effectDeps: [currentUser.username]
  })

  const logged = currentUser.username != undefined

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button color="default" variant="flat">
          {currentUser.username && (<img src={iconAvatar} alt={currentUser.username} className="h-7"/>)}
          {currentUser.username ?? "Sin cuenta"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile menu"
        disabledKeys={["profile"]}
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions">
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
            textValue="User"
          >
            <User
              name={currentUser.username == undefined ? "Invitado" : currentUser.username}
              description={currentUser.username == undefined ? "none" : currentUser.phone}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "sm",
                radius: 'none',
                src: iconAvatar,
              }}
            />
          </DropdownItem>
          {/* -------- USER PATH ONLY ---------- */}
          {
            !logged && (
              <DropdownItem key="login-btn" onPress={onOpenLogin}>
                Iniciar Sesión
              </DropdownItem>
            ) 
          }
          {
            // Esta doble porque da un error con nextui
            !logged && (
              <DropdownItem key="signup-btn" onPress={onOpenChangeSignUp}>
                Registrarse
              </DropdownItem>
            )
          }
          {
            // Admin Link
            (!admin && logged && currentUser.role == 'admin') && (
              <DropdownItem key="admin-link" href='/admin'>
                Admin Dashboard
              </DropdownItem>  
            )
          }

          {/* -------- ADMIN PATH OYLY --------- */}
          {
            // Admin Link
            (admin) && (
              <DropdownItem key="admin-return-link" href='/'>
                Volver al Inicio
              </DropdownItem>  
            )
          }

          {/* -------- END ADMIN PATH ---------- */}
          {(logged) && (
            <DropdownItem
              key="logout-btn"
              onPress={() => {
                openModal({
                  title: `Logout`,
                  desc: `¿Seguro que deseas salir de la cuenta actual?`,
                  action: "action",
                  onSubmit: () => handleLogout(),
                });
              }}
            >
              Cerrar Sesión
            </DropdownItem>
          )}


        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserDropdown;