"use client"
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import DeleteIcon from "../Icons/DeleteIcon";
import CheckIcon from "../Icons/CheckIcon";

export default ({usuarios}) => {
  
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
          {usuarios && usuarios.map((user, i) => (
            <TableRow key={user.username}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <div className="flex items-center gap-4 ">
                  <div>
                    <button onClick={() => {
                      // TODO para Dayniel
                    }}>
                      <CheckIcon size={20} fill="#18c964" />
                    </button>
                  </div>
                  <div>
                    <button onClick={() => {
                      // TODO para Dayniel
                    }}>
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
}
