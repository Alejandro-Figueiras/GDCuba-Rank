import { 
  Table, 
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Checkbox
} from "@nextui-org/react";
import { useContext } from 'react'
import { ModalContext } from "@/app/context/ModalContext";
import { notify } from "@/libs/toastNotifications";
import UsernameCell from "@/components/Rank/UsernameCell";
import CubanCheckbox from "./CubanCheckbox.jsx";

export default ({gdaccounts, updateAccounts}) => {
  const { openModal } = useContext(ModalContext);

  const handleDelete = async(record) => {
    // openModal({
    //   title: `Eliminar Record #${record.id}`,
    //   desc: `¿Seguro que quieres eliminar este Record`,
    //   action: "delete",
    //   onSubmit: async () => {
    //     const result = JSON.parse(await removeRecord({id: record.id}))

    //     if (result==1) {
    //       const success = notify(
    //         `Record #${record.id} eliminado`,
    //         "success"
    //       );
    //     } else {
    //       const error = notify(`Error al eliminar a ${record.id}`, "error");
    //     }
    //     updateAccounts()
    //   },
    // });
  }

  return (
    <>
      <Table aria-label="Todos los records">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Cubano</TableColumn>
        </TableHeader>
        <TableBody>
          {gdaccounts && gdaccounts.map((acc) => (
            <TableRow key={acc.id}>
              <TableCell>{acc.id}</TableCell>
              <TableCell><UsernameCell player={acc} /></TableCell>
              <TableCell><CubanCheckbox acc={acc} updateData={updateAccounts} openModal={openModal}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}