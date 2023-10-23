"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import DeleteIcon from "../Icons/DeleteIcon";
import CheckIcon from "../Icons/CheckIcon";
import { apiRequest } from "@/libs/serverRequest";
import config from "../../../config";
import { notify, notifyDismiss } from "@/libs/toastNotifications";
import ModalAccept from "./ModalAccept";
import { useDisclosure } from "@nextui-org/react";
import { useContext } from "react";
import { ModalContext } from "@/app/context/ModalContext";

export default ({ usuarios }) => {
  const { openModal } = useContext(ModalContext);
  const handleValidateButton = async (user) => {
    const loading = notify(`Verificando a ${user}`, "loading");
    const apiResult = await apiRequest(
      config.apiURL + `admin/users/validate/${user}`
    );

    if (!apiResult.isError()) {
      const success = notify(`Usuario ${user} verificado`, "success");
    } else {
      const error = notify(`Error al verificar a ${user}`, "error");
      apiResult.show();
    }
    notifyDismiss(loading);
  };

  const handleDeletionButton = async (user) => {
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
  };
  return (
    <>
      <Table aria-label="Todos los usuarios">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Teléfono</TableColumn>
          <TableColumn>Verificar</TableColumn>
        </TableHeader>
        <TableBody>
          {usuarios &&
            usuarios.map((user, i) => {
              const {
                isOpen: isOpenAccept,
                onOpen: onOpenAccept,
                onOpenChange: onOpenChangeAccept,
              } = useDisclosure();
              const {
                isOpen: isOpenDelete,
                onOpen: onOpenDelete,
                onOpenChange: onOpenChangeDelete,
              } = useDisclosure();
              return (
                <TableRow key={user.username}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    {/* <ModalAccept 
                    isOpen={isOpenAccept} 
                    onOpenChange={onOpenChangeAccept} 
                    title={"Esta seguro de que desea verificar el usuario "+user.username+"?"}
                    submit={() => handleValidateButton(user.username)}/>
                  <ModalAccept 
                    isOpen={isOpenDelete} 
                    onOpenChange={onOpenChangeDelete} 
                    title={"Esta seguro de que desea eliminar el usuario "+user.username+"?"}
                    submit={() => handleDeletionButton(user.username)}/> */}
                    <div className="flex items-center gap-4 ">
                      <div>
                        <button
                          onClick={() => {
                            openModal({
                              title: `Verificar ${user.username}`,
                              desc: `Seguro que quieres verificar al pana ${user.username}`,
                              action: "validate",
                              onSubmit: () => handleValidateButton(user.username),
                            });
                          }}
                        >
                          <CheckIcon size={20} fill="#18c964" />
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            openModal({
                              title: `Funar ${user.username}`,
                              desc: `Seguro que quieres funar al pana ${user.username}`,
                              action: "delete",
                              onSubmit: () => handleDeletionButton(user),
                            });
                          }}
                        >
                          <DeleteIcon size={20} fill="#FF0080" />
                        </button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};
