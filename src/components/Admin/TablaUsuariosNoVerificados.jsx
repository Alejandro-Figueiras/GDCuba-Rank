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

export default ({ usuarios }) => {
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
            usuarios.map((user, i) => (
              <TableRow key={user.username}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-4 ">
                    <div>
                      <button
                        onClick={() => {
                          // TODO para Dayniel
                          handleValidateButton(user.username);
                        }}
                      >
                        <CheckIcon size={20} fill="#18c964" />
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          // TODO para Dayniel
                          handleDeletionButton(user.username);
                        }}
                      >
                        <DeleteIcon size={20} fill="#FF0080" />
                      </button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};
