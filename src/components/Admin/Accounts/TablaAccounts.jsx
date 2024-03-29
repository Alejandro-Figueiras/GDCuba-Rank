import { 
  Table, 
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Spinner
} from "@nextui-org/react";
import { useContext } from 'react'
import { ModalContext } from "@/app/context/ModalContext";
import { notify } from "@/libs/toastNotifications";
import UsernameCell from "@/components/Rank/UsernameCell";
import CubanCheckbox from "./CubanCheckbox.jsx";
import { removeGDAccountAction } from "@/actions/admin/accountsActions.js";

export default ({ gdaccounts, updateAccounts, loading = false }) => {
  const { openModal } = useContext(ModalContext);

  const handleDelete = async(acc) => {
    openModal({
      title: `Eliminar Cuenta ${acc.username}`,
      desc: `¿Seguro que quieres eliminar esta cuenta?`,
      action: "delete",
      onSubmit: async () => {
        const result = JSON.parse(await removeGDAccountAction({username: acc.username}))

        if (result==1) {
          const success = notify(
            `Cuenta ${acc.username} eliminada`,
            "success"
          );
        } else {
          const error = notify(`Error al eliminar la cuenta ${acc.username}`, "error");
        }
        updateAccounts()
      },
    });
  }

  return (
    <>
      <Table aria-label="Todos los records" classNames={{table: loading?'min-h-[300px]':''}}>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Cubano</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<Spinner label="Cargando datos..." />}
          emptyContent={loading?null:"No hay cuentas para mostrar"}
        >
          {gdaccounts && gdaccounts.map((acc) => (
            <TableRow key={acc.id}>
              <TableCell>{acc.id}</TableCell>
              <TableCell><UsernameCell player={acc} /></TableCell>
              <TableCell><CubanCheckbox acc={acc} updateData={updateAccounts} openModal={openModal}/></TableCell>
              <TableCell>
                <Button 
                  size='sm'
                  color='danger'
                  onClick={e=>handleDelete(acc)}
                >Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}